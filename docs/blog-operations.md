# Deploy the blog

The blog uses EmDash's native Cloudflare Access authentication. The Worker verifies Access tokens against the team domain and `CF_ACCESS_AUDIENCE`.
Automatic account creation is disabled. An allowed Access identity also needs an existing EmDash user.
Local development uses EmDash's development authentication.

## Protect the dashboard

The dashboard Access application reuses the existing allow policy. Protect these paths with its application audience:

- `blog.skakatur.dev/_emdash`
- `blog.skakatur.dev/_emdash/*`
- `blog.skakatur.dev/_emdash/api/search/enable`
- `blog.skakatur.dev/_emdash/api/search/rebuild`
- `blog.skakatur.dev/_emdash/api/search/stats`

This includes dashboard pages, setup, authentication, and CMS APIs. Public blog pages do not need an Access policy.
The separate public-read application bypasses Access for media files, public search, health, and domain verification:

- `/_emdash/api/media/file/*`
- `/_emdash/api/search` and `/_emdash/api/search/suggest`
- `/_emdash/api/health`
- `/_emdash/api/site/domain-proof`
- `/_emdash/api/plugins/emdash-forms/definition` and `/_emdash/api/plugins/emdash-forms/submit`

Access path policies also cover descendant paths. The explicit search management paths above override the public search policy.
Keep those overrides when changing public search access. Do not bypass setup, login, or management API paths.
Keep Worker development URLs and preview URLs disabled.

## Apply database migrations

Production checks migrations before serving requests. It does not apply migrations during visitor requests.
Development applies migrations automatically to local D1.

Set these deployment environment variables in your shell or build environment:

- `CLOUDFLARE_API_TOKEN`: a token with D1 Edit and Worker deployment permissions.
- `CLOUDFLARE_ACCOUNT_ID`: the account that owns the blog Worker.
- `D1_DATABASE_ID`: the production UUID in `apps/blog/cloudflare.config.ts`.
- `EMDASH_TARGET_FINGERPRINT`: the fingerprint reported by the status command after you verify the target.

Build the migration manifest and inspect the target:

```sh
pnpm --filter blog build
pnpm --filter blog db:status
```

Confirm the account and database UUID before setting `EMDASH_TARGET_FINGERPRINT`.
Deploy with the package script:

```sh
pnpm cf-deploy-blog
```

The script builds, applies migrations, deploys the built Worker, and checks the database.
A failed migration stops deployment. Missing deployment variables cause migration validation to fail.
Keep the runtime `EMDASH_MIGRATIONS_MODE` unset so the committed check mode applies.

## Verify access

Use a browser without an Access session. Public pages should load; dashboard and CMS API paths should redirect to Access.
Check the Access application's allow policy after changing its paths. Preserve its identity rules.
Never add an Everyone allow or bypass policy to dashboard or setup routes.
