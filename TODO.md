# Blog Deployment

## 0. Prerequisites

Ensure you have Node.js and pnpm installed. Wrangler is included as a devDependency in the blog app.

```
pnpm install
```

Authenticate with Cloudflare:

```
npx wrangler login
```

## 1. Create D1 Database

```
npx wrangler d1 create sk-blog
```

Copy the `database_id` from the output. Open `apps/blog/wrangler.jsonc` and replace `"local"` on line 13 with that ID.

## 2. Create R2 Bucket

```
npx wrangler r2 bucket create sk-blog-media
```

## 3. Generate and Set Auth Secrets

```
npx emdash auth secret
```

Run this twice. You need two different secrets.

```
cd apps/blog
npx wrangler secret put EMDASH_AUTH_SECRET
```

Paste the first secret when prompted. Also add it to `apps/blog/.env.production`:

```
EMDASH_AUTH_SECRET=<paste-the-same-secret>
```

```
npx wrangler secret put EMDASH_PREVIEW_SECRET
```

Paste the second secret when prompted. Also add it to `apps/blog/.env.production`:

```
EMDASH_PREVIEW_SECRET=<paste-the-same-secret>
```

```
npx wrangler secret put EMDASH_SITE_URL
```

Enter `https://blog.skakatur.dev` when prompted. Also add it to `apps/blog/.env.production`:

```
EMDASH_SITE_URL=https://blog.skakatur.dev
```

## 4. Apply Database Schema

```
npx wrangler d1 execute sk-blog --file=./node_modules/emdash/migrations/0001_core.sql
```

Run this from the `apps/blog` directory.

## 5. Deploy

From the monorepo root:

```
pnpm run cf-deploy-blog
```

This runs `astro build && wrangler deploy`. The blog will be live at `https://skakatur-blog.<your-subdomain>.workers.dev`.

## 6. Setup Admin Account

Open `https://skakatur-blog.<your-subdomain>.workers.dev/_emdash/admin/setup`

Follow the setup wizard to create your admin account (Samyak Kakatur).

## 7. Custom Domain

In the Cloudflare Dashboard:

1. Go to **Workers & Pages** → **skakatur-blog** → **Settings** → **Domains & Routes**
2. Click **Add** → **Custom Domain**
3. Enter `blog.skakatur.dev`
4. Wait for DNS propagation

## 8. Update Site Settings

In the EmDash admin at `https://blog.skakatur.dev/_emdash/admin`:

1. Go to **Settings**
2. Set **Site Title** to `SKB`
3. Set **Tagline** to `My personal ramblings`
4. Save

## 9. Verify

- `https://blog.skakatur.dev` — shows "SKB" header
- `https://blog.skakatur.dev/posts` — shows empty post listing
- `https://blog.skakatur.dev/_emdash/admin` — admin dashboard works

---

# Creating Your First Blog Post

## Via Admin UI (recommended)

1. Go to `https://blog.skakatur.dev/_emdash/admin`
2. Click **Posts** → **New Post**
3. Fill in:
   - **Title** — your post title
   - **Excerpt** — short description (optional)
   - **Content** — write in the Portable Text editor
   - **Featured Image** — click to upload
4. Set **Category** and **Tags** from the sidebar
5. Click **Publish**

## Uploading Images

In the post editor, click the image upload button in the content area or the Featured Image field.
