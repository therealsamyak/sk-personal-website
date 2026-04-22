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

Paste the first secret when prompted.

```
npx wrangler secret put EMDASH_PREVIEW_SECRET
```

Paste the second secret when prompted.

```
npx wrangler secret put EMDASH_SITE_URL
```

Enter `https://blog.skakatur.dev` when prompted.

## 4. Apply Database Schema

```
npx wrangler d1 execute sk-blog --file=./node_modules/emdash/migrations/0001_core.sql
```

Run this from the `apps/blog` directory.

## 5. Deploy

From the monorepo root:

```
pnpm --filter blog deploy
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

## Via CLI

### Login to your blog

```
npx emdash login --url https://blog.skakatur.dev
```

### Create a post

```
npx emdash content create posts --data '{"title": "My First Post", "excerpt": "Hello world", "content": "# Hello\n\nThis is my first blog post."}' --slug my-first-post
```

The `content` field accepts markdown — EmDash converts it to Portable Text automatically.

### Update a post

```
npx emdash content get posts <id> --json
```

Copy the `_rev` value from the output, then:

```
npx emdash content update posts <id> --rev <rev-value> --data '{"title": "Updated Title"}'
```

### Publish a draft

```
npx emdash content publish posts <id>
```

## Uploading Images

### Via CLI

```
npx emdash media upload ./path/to/image.jpg --alt "Description of the image"
```

Returns a media ID. Use this ID when creating/updating a post's featured_image field.

### Via Admin UI

In the post editor, click the image upload button in the content area or the Featured Image field.

### Uploading a Featured Image for a Post (CLI)

```
MEDIA_ID=$(npx emdash media upload ./photo.jpg --alt "Photo description" --json | jq -r '.id')

npx emdash content create posts --data "{\"title\": \"My Post\", \"featured_image\": {\"\$media\": {\"id\": \"$MEDIA_ID\"}}, \"content\": \"# Hello\"}" --slug my-post
```

## Managing Categories and Tags

### List existing terms

```
npx emdash taxonomy terms category
npx emdash taxonomy terms tag
```

### Add a new category

```
npx emdash taxonomy add-term category --name "New Category" --slug new-category
```

### Add a new tag

```
npx emdash taxonomy add-term tag --name "New Tag" --slug new-tag
```

### Assign categories/tags when creating a post

Use the `--taxonomies` flag:

```
npx emdash content create posts --data '{"title": "My Post", "content": "Hello"}' --slug my-post --taxonomies '{"category": ["development"], "tag": ["webdev"]}'
```
