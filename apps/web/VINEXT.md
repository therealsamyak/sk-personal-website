# Verify the Vinext migration

The website uses Vinext 1.4.4, Cloudflare Vite plugin 2.0.0-beta.v.12, and the Static Assets adapter 1.3.3.
The Worker entrypoint is `vinext/server/fetch-handler`. There is no Next CLI or OpenNext runtime path.
`next-view-transitions` retains its transitive Next peer package; Vite resolves its `next/*` imports to Vinext shims.
The blog retains its separate Astro, TypeScript 6, and Wrangler dependencies.

## Build and runtime checks

Run `pnpm --filter web build` and `pnpm --filter web typecheck`.
Run `pnpm --filter blog build` after generating its EmDash types as described in the root README.
Temporary verification loads the actual Worker artifact and blocks unexpected outbound requests.
It checks these behaviors:

- Packaged prerendered HTML returns `x-vinext-cache: HIT` for every website page.
- Static scripts remain available; the private cache directory stays inaccessible.
- `/home` redirects, and unknown paths return 404.
- Invalid input and missing tokens cause no external requests.
- Invalid, expired, and unavailable CAPTCHA verification prevents email requests.
- Successful verification precedes two mocked email requests.
- Contact text is escaped before insertion into HTML email templates.
- Delivery failures reject the action; cross-origin action requests return 403.

The Worker configuration retains the domain, existing bindings, compatibility settings, and dashboard-secret preservation metadata.
The build adds no cloud resources. No deployment or Cloudflare account change is part of this migration.

## Browser checks

Headless browser QA uses local Workers emulation and Cloudflare's public Turnstile test key.
Email delivery and server-side CAPTCHA responses are intercepted in a separate local Miniflare instance.
Screenshots remain local under `.agents/evidence/vinext/screenshots/` and are excluded from the PR.
The following scenarios pass:

- Direct loads of home, projects, contact, privacy, and cookie policy in desktop and phone layouts.
- Light and dark themes, saved theme reloads, and no horizontal overflow.
- Client navigation, back/forward history, and a direct contact hash URL.
- Consent preferences, Escape dismissal, necessary-only consent, and persistence after reload.
- Turnstile test-widget loading and recreation after route navigation, with one script instance.
- Contact success with two mocked emails, and an error view when the token is missing.

A fresh browser session reports no page errors through navigation, persisted consent, theme reloads, and contact remounting.
Real email delivery, production CAPTCHA credentials, and deployed Worker behavior remain untested by design.

## Review constraints

The production build emits upstream source-map and icon import-optimization warnings.
Lint retains the existing React Hook Form compiler warning. Type checking has no errors.
Production dependency audit reports no known vulnerabilities.
The Cloudflare Vite plugin and `cf` CLI use pinned beta releases; this remains an optional draft migration.

The changed modules retain separate configuration, verification, sanitization, and email responsibilities.
Turnstile JSON is validated at the network boundary. Runtime secrets stay outside the client bundle.
Temporary checks cover runtime behavior. No test files or test setup are retained in this repository.
