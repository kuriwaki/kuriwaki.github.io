# Deferred plan: teaching blog link previews

Status: plan only. Do not add preview metadata, generate images, change publishing workflows, or change GitHub Pages settings until this plan is run. Automatic citations and “Share on X” use the existing Jekyll build and do not require this work.

## Intended result

Every published teaching post, including existing posts, gets a static social image showing its full title, publication date, and full author name. Match the blog’s system font, white background, dark gray text (`#2d2d2d`), muted gray (`#6f777d`), and blue (`#267cb9`). Keep the design simple. Use the date shown in the byline and resolve author keys through `_data/authors.yml`. Convert Markdown titles to readable text without truncating them; wrap or resize long titles.

Sharing must use the public canonical URL under `https://www.shirokuriwaki.com`, including when testing locally. X controls the final presentation and caching of link previews.

## Implementation

1. Inspect the current layouts, configuration, author records, and working tree. Preserve unrelated edits and reuse the existing citation and sharing footer. Recheck the Pages publishing source: it currently uses GitHub’s legacy branch build, which cannot run a custom PNG generator.
2. Export a Jekyll JSON manifest for published `blog-teaching` posts containing canonical URL, plain-text title, byline date, author name, and description. Prefer `summary`, then `description`, then a plain-text excerpt; normalize whitespace and cap the description at 200 characters. Use Jekyll’s normal future-post filtering.
3. Generate 1200-by-630 PNGs from that manifest with a small deterministic renderer. Use the blog’s actual system font, reliable wrapping, and readable title/date/author sizes. Give each image descriptive alt text. Store a URL-to-image lookup for Liquid; use content-based filenames so title or author edits produce a fresh image URL. Run the generator for all published posts on every build so it covers old and future posts automatically when published.
4. Add one shared include for canonical, Open Graph, and X Card metadata. Supply the title, description, absolute public URL, image URL, image dimensions, and alt text; include the article publication time on posts. Escape attribute values once. Use `summary_large_image`. Include this metadata from the blog layout without duplicating existing description or canonical tags.
5. Add a GitHub Actions Pages workflow: install dependencies, run Jekyll to export the manifest into a temporary build, generate images and lookup data, then run the final Jekyll build and deploy its artifact. Exclude scripts and intermediate manifests from the published site. Migrate Pages from the legacy branch source to workflow publishing as part of that future rollout, after verifying the workflow. No migration is needed now for citations or sharing links.
6. Document the build and optional image overrides. Keep per-post front matter optional: `image: /blog-teaching/images/example.png` with `image_alt`, or `image: {path: ..., alt: ...}`. A generic blog image can serve as a fallback or a simpler alternative if automatic title/date/author cards are deferred again.

## Target files

- `_includes/blog-teaching-social.html` and `_layouts/blog-teaching.html`: shared metadata.
- `_config.yml`: public URL, defaults, and publishing exclusions.
- `blog-teaching/social-cards.json`: Jekyll-generated manifest template.
- `scripts/generate_blog_cards.py` and `requirements-social-cards.txt`: renderer and dependencies. The new script’s first line must be `# Written by Codex`.
- `_data/blog_social_cards.json` and `blog-teaching/images/social-cards/`: generated lookup and images; decide whether to generate only in CI or track them before implementation.
- `.github/workflows/pages.yml`: publishing workflow; adapt any existing workflow instead of creating a competing deploy job.
- `README.md`: author-facing usage and local verification.
- Optional `blog-teaching/images/social-preview.svg` and `.png`: editable generic fallback.

## Verification before publishing

- Build with production settings and with `_config_preview.yml`. Confirm that every published post has one metadata set and all canonical/image URLs use the public domain, never localhost or the old GitHub domain.
- Inspect generated images for both authors, the oldest post, a long Markdown title, and punctuation such as quotes and ampersands. Confirm full titles, correct dates, readable wrapping, and no clipping.
- Confirm that future posts remain absent from normal builds and receive cards when included in a future-enabled test build. Avoid treating generated HTML previews in `_posts` as extra source posts.
- Verify optional image overrides, alt text, description fallback, image dimensions, and that all referenced files exist in the final artifact.
- Confirm citations and editable “Share on X” drafts still work. After deployment, check the public page and image URLs and inspect a real shared-link preview; account for platform caching.
