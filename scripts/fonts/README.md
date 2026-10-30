# Reduce font bytes

Font bytes decrease without changed pixels in twelve comparisons.
The baseline uses commit `6655e9eadb328141deb013bb98ec778baff95feb` and the same local CMS content.

## Compare font files

Sizes count WOFF2 file bytes after HTTP content decoding.
This table totals all original public font files, including unused language files.

| Application | Font           |  Before |   Core | Extended |   After |  Saved |
| :---------- | :------------- | ------: | -----: | -------: | ------: | -----: |
| blog        | Syne           |  34,560 | 19,868 |   12,916 |  32,784 |  1,776 |
| blog        | Spectral       | 122,344 | 71,472 |   43,156 | 114,628 |  7,716 |
| blog        | JetBrains Mono |  64,436 | 47,988 |   14,048 |  62,036 |  2,400 |
| web         | JetBrains Mono |  86,320 | 40,448 |   15,232 |  55,680 | 30,640 |
| web         | Geist          |  75,948 |      0 |        0 |       0 | 75,948 |
| web         | Geist Mono     |  70,516 |      0 |        0 |       0 | 70,516 |

`font-baseline-inventory.json` records each original file, glyph count, axes, features, and hinting.
`font-subsets.json` records each output file and its measured properties.
The baseline inventory includes unchanged EmDash admin Noto Sans files. They do not load on these public pages.

## Compare page requests

Each page loads only its core file after the change.
The extended file loads when the specimen adds Latin Extended-A text. CJK text alone causes no extra request.

| Page              | Before |  After |  Saved |
| :---------------- | -----: | -----: | -----: |
| blog-home         | 34,560 | 19,868 | 14,692 |
| blog-post         | 34,560 | 19,868 | 14,692 |
| blog-search       | 34,560 | 19,868 | 14,692 |
| blog-404          | 34,560 | 19,868 | 14,692 |
| web-root          | 92,876 | 40,448 | 52,428 |
| web-home          | 92,876 | 40,448 | 52,428 |
| web-projects      | 92,876 | 40,448 | 52,428 |
| web-contact       | 92,876 | 40,448 | 52,428 |
| web-privacy       | 92,876 | 40,448 | 52,428 |
| web-cookie-policy | 92,876 | 40,448 | 52,428 |

All four blog pages preload Syne. All six portfolio pages initially preload JetBrains Mono, Geist, and Geist Mono.
After the change, each page preloads one unique core URL.
Next.js can emit duplicate preload tags for that URL; the browser makes one font request.

Policy page code removes preload tags after initial parsing.
The report records initial HTML tags, final DOM tags, HTTP headers, and actual requests separately.
See `font-validation.json` for each path and byte count.

## Preserve current rendering

The blog theme uses raw font names. Astro generates different family names.
Public blog text therefore uses its existing system fallback fonts.
Keep that behavior. Connecting those faces would change the appearance.

Only the blog Syne preload downloads. Spectral and JetBrains Mono remain unloaded.
The script keeps their face declarations and creates two files for each source face.
The generated families place core and extended faces before every fallback.

The portfolio draws current page text with JetBrains Mono at weights 400, 500, 600, and 700.
Geist and Geist Mono download but do not draw that text. Remove their unused loaders.
Keep the Arial fallback, metric overrides, and `font-display: swap`.

## Check content and font settings

The audit covers stylesheets, inline Astro styles, React classes, rendered styles, seed text, and local CMS output.
Inline blog titles use weight 800. Index components also use weights 600 and 700.
Syne keeps its 400–800 variable range. Blog JetBrains Mono keeps 400–600.

Spectral keeps static normal and italic faces at weights 300, 400, 500, and 600.
Bold inside italics keeps the existing 600 face selection and synthetic bold behavior.
The ribbon enables `tabular-nums`; retain `tnum`. No current styles enable fractions or custom variation settings.

The script keeps default shaping features where present.
These include `ccmp`, `locl`, `liga`, `clig`, `calt`, `rlig`, `kern`, `mark`, and `mkmk`.
Blog outputs remove unused `frac`, `dnom`, `numr`, `pnum`, and `lnum` features.

The character set includes source text, Latin-1, Latin Extended-A, and canonical decomposition characters.
Each CSS range contains only code points present in its file.
Shared combining marks retain the original shaping coverage. The core declarations take priority for shared marks.

U+2010 needs an explicit mapping to the existing primary hyphen glyph.
Chromium uses that glyph when the original face advertises U+2010 despite its missing cmap entry.
Encoding the same glyph preserves the measured width and pixels.

CJK remains in system fonts. Characters outside original blog Latin coverage keep their existing fallback behavior.
The web specimen omits the blog-only issue symbol. Unused portfolio Cyrillic font files are removed.

## Keep measured exceptions

The portfolio keeps its original Latin and Latin Extended-A glyph data and unused features.
A smaller prototype uses 49,440 bytes across both files but changes 29 accent pixels.
The default uses 55,680 bytes. Preserving rendering costs 6,240 additional bytes across both files.

The portfolio core includes Latin-1 and the original Latin shaping coverage.
Its core uses 40,448 bytes, compared with 32,832 bytes in the rejected prototype.
This exception costs 7,616 bytes on pages that need only the core.

Keep the original 100–800 portfolio axis, glyph names, font bounds, missing-glyph outline, and raster flags.
Axis restriction and glyph-data reduction change tested rendering. No rendering change receives implicit approval.
Original public fonts contain zero glyph hint instruction bytes. The script removes hinting from blog derivatives.

Blog derivatives use new internal names and keep copyright records and OFL notices.
JetBrains Mono declares no Reserved Font Name. Its portfolio names remain unchanged.
Both portfolio files remain WOFF2. No processing runs during normal builds.

## Read pixel evidence

All twelve comparisons have zero changed pixels.
They cover ten production pages and two specimens with code, italics, bold text, accents, inline settings, and CJK.
The specimens also cover automatic hyphens and U+2010.

The viewport is 1920×1080. Full-page PNGs include content below the viewport.
Chromium excludes its 15-pixel scrollbar from portfolio PNG widths.
Both captures fix clock text and CSS animations. Text and layout remain equal.

`font-validation.json` contains exact pixel counts and image names.
Before, after, and difference PNGs reside in `.agents/evidence/font-loading/screenshots/`.

## Rerun font processing

Run these commands from the repository root:

```sh
uv run scripts/fonts/font-subset.py /path/to/public-cms-text.txt
bun x oxfmt apps/blog/src/styles/font-subsets.css apps/web/app/font-subsets.css scripts/fonts/*.json
```

Omit the optional path when source and seed text provide the required characters.
Use a public text export. Do not pass a database or secrets.

Rerun after changes to content characters, families, weights, styles, features, or inline settings.
Update pinned source coverage when new content needs additional characters.
Review the license, source hash, generated ranges, requests, and pixel comparisons after each source change.

The manifest pins source URLs and SHA-256 hashes. Downloads remain in memory.
Commit the generated WOFF2 files, CSS, and reports after validation.
Keep font processing separate from normal builds.

## Check validation limits

Both production builds pass. Blog validation includes Astro type checking.
Portfolio TypeScript, changed-file oxlint, and React Doctor checks pass.
A repeated manual run produces identical font asset hashes.

The CMS snapshot contains one local verification post. Additional content cases use controlled specimens.
The public RSS request returns HTTP 403. These results do not claim an audit of unavailable live content.
No secrets, database state, embedding, idle precaching, merge, or deployment form part of this change.
