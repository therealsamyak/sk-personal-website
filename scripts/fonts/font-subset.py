# /// script
# requires-python = ">=3.13"
# dependencies = ["fonttools[woff]==4.68.0"]
# ///
"""Generate committed web font subsets. Run this script by hand with uv."""

import hashlib
import io
import json
import unicodedata
from pathlib import Path
from urllib.request import urlopen

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parents[2]
FONT_SOURCES = Path(__file__).with_name("font-sources.json")
CORE_CHARACTERS = set(range(32, 127)) | {0xA0, 0xA7, 0xA9, 0xB7, 0x0304, 0x0308, 0x2010, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2026, 0x2116, 0x2190, 0x2192}
FONT_FEATURES = ["ccmp", "locl", "liga", "clig", "calt", "rlig", "kern", "mark", "mkmk", "tnum"]


def font_unicode_range(characters):
    """List only Unicode characters present in a generated font."""
    ranges = []
    for code in sorted(characters):
        if ranges and code == ranges[-1][1] + 1:
            ranges[-1][1] = code
        else:
            ranges.append([code, code])
    return ",".join(f"U+{a:X}" if a == b else f"U+{a:X}-{b:X}" for a, b in ranges)


def collect_font_characters():
    """Keep content characters, Latin-1, Latin Extended-A, and CSS hyphens."""
    characters = set(range(0x20, 0x180)) | CORE_CHARACTERS
    for app in ["blog", "web"]:
        for directory in [ROOT / "apps" / app / "src", ROOT / "apps" / app / "app", ROOT / "apps" / app / "components", ROOT / "apps" / app / "config", ROOT / "apps" / app / "seed"]:
            if directory.exists():
                for path in sorted(directory.rglob("*")):
                    if path.suffix in {".astro", ".tsx", ".ts", ".css", ".json", ".md", ".mdx"}:
                        characters.update(map(ord, path.read_text()))
    # Pass a public CMS text export as an optional argument. Do not pass a database or secrets.
    import sys
    for path in sys.argv[1:]:
        characters.update(map(ord, Path(path).read_text()))
    return characters


def generate_font_subsets():
    """Write font assets and CSS without adding font processing to builds."""
    characters = collect_font_characters()
    decomposition = {ord(c) for code in characters for c in unicodedata.normalize("NFD", chr(code))}
    styles = {"blog": [], "web": []}
    report = []
    for source in json.loads(FONT_SOURCES.read_text()):
        data = urlopen(source["url"], timeout=60).read()
        if hashlib.sha256(data).hexdigest() != source["sha256"]:
            raise ValueError("Font source checksum mismatch")
        original = TTFont(io.BytesIO(data), recalcTimestamp=False, recalcBBoxes=False)
        family = original["name"].getDebugName(1)
        # Rename blog derivatives. JetBrains Mono declares no Reserved Font Name.
        internal_family = "Dispatch " + source["id"]
        axis_limits = {}
        # Restricting the portfolio weight axis changes glyph outlines at used weights.
        # Keep its original axis and gasp raster flags to preserve page pixels.
        if "fvar" in original and source["app"] != "web":
            low, high = (400, 800) if family == "Syne" else (400, 600)
            axis_limits = {"wght": (low, high)}
        for part in source.get("parts", ["extended", "core"]):
            # Preserve font bounds and glyph names: changing either changes Chromium pixels.
            font = TTFont(io.BytesIO(data), recalcTimestamp=False, recalcBBoxes=False)
            # Chromium maps U+2010 to the primary hyphen when the original face advertises it.
            # Encode that same hyphen so an exact Unicode range preserves its width.
            if source["app"] == "web":
                for table in font["cmap"].tables:
                    if table.isUnicode() and 0x2D in table.cmap:
                        table.cmap[0x2010] = table.cmap[0x2D]
            if axis_limits:
                font = instantiateVariableFont(font, axis_limits, inplace=True)
            # Materialize lazy variation records before glyph names change during subsetting.
            if "gvar" in font:
                font["gvar"].variations = {
                    glyph: font["gvar"].variations.get(glyph, []) for glyph in font.getGlyphOrder()
                }
            requested = (characters | decomposition) & set(font.getBestCmap())
            if "allowed_characters" in source:
                requested &= set(source["allowed_characters"])
            core_characters = set(source.get("core_characters", CORE_CHARACTERS))
            requested = requested & core_characters if part == "core" else requested - core_characters
            options = subset.Options()
            options.hinting = False
            options.glyph_names = source["app"] == "web"
            options.notdef_outline = source["app"] == "web"
            options.layout_features = FONT_FEATURES
            options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]
            options.name_legacy = True
            options.name_languages = [0x409]
            if source["app"] == "web" and part == "extended":
                requested |= {0x0304, 0x0308} & decomposition & set(font.getBestCmap())
            css_characters = requested.copy()
            # Keep the original hidden A and space cmap entries for raster calibration.
            # Exclude these entries from the extended CSS range to prevent eager loading.
            if source["app"] == "web" and part == "extended":
                requested |= {0x20, 0x41}
            subsetter = subset.Subsetter(options=options)
            subsetter.populate(unicodes=requested)
            if not source.get("preserve_glyph_data"):
                subsetter.subset(font)
            if "gasp" in font and source["app"] != "web":
                del font["gasp"]
            for record in font["name"].names:
                if source["app"] != "web" and record.nameID in {1, 3, 4, 6, 16}:
                    name = internal_family.replace(" ", "") if record.nameID == 6 else internal_family
                    record.string = name.encode(record.getEncoding())
            font.flavor = "woff2"
            filename = source["id"] + "-" + part + ".woff2"
            target = ROOT / "apps" / source["app"] / "public" / "fonts" / filename
            target.parent.mkdir(parents=True, exist_ok=True)
            font.save(target)
            checked = TTFont(target)
            actual = set(checked.getBestCmap())
            if not css_characters <= actual:
                raise ValueError("Font subset character mismatch")
            for face in source["faces"]:
                styles[source["app"]].append(f'''@font-face {{
  font-family: "{source['family']}";
  src: url("/fonts/{filename}") format("woff2");
  font-display: swap;
  font-weight: {face['weight']};
  font-style: {face['style']};
  unicode-range: {font_unicode_range(css_characters)};
}}''')
            report.append({
                "app": source["app"],
                "family": family,
                "source": source["id"],
                "part": part,
                "bytes": target.stat().st_size,
                "glyphs": checked["maxp"].numGlyphs,
                "characters": len(actual),
                "default_weight": checked["OS/2"].usWeightClass,
                "axes": {
                    a.axisTag: [a.minValue, a.defaultValue, a.maxValue]
                    for a in checked["fvar"].axes
                } if "fvar" in checked else {},
                "features": {
                    tag: sorted({r.FeatureTag for r in checked[tag].table.FeatureList.FeatureRecord})
                    for tag in ["GSUB", "GPOS"]
                    if tag in checked and checked[tag].table.FeatureList
                },
                "raster_flags": checked["gasp"].gaspRange if "gasp" in checked else {},
            })
    # Keep real core and extended faces in the same family, before every fallback.
    styles["blog"].append(Path(__file__).with_name("blog-font-fallbacks.css").read_text())
    styles["web"].append('''@font-face {
  font-family: "JetBrains Mono Fallback";
  src: local(Arial);
  ascent-override: 75.79%;
  descent-override: 22.29%;
  line-gap-override: 0%;
  size-adjust: 134.59%;
}
:root { --font-sans: "JetBrains Mono", "JetBrains Mono Fallback"; }
''')
    for app, css in styles.items():
        path = ROOT / "apps" / app / ("src/styles/font-subsets.css" if app == "blog" else "app/font-subsets.css")
        path.write_text("/* Generated by scripts/fonts/font-subset.py. Do not edit. */\n" + "\n".join(css))
    Path(__file__).with_name("font-subsets.json").write_text(json.dumps(report, indent=2) + "\n")


if __name__ == "__main__":
    generate_font_subsets()
