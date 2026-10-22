<https://www.kuriwaki.github.io>, rerouted to <https://www.shirokuriwaki.com>

## Preview the teaching blog

From this repository's directory, run:

```bash
bundle exec jekyll serve --safe --config _config.yml,_config_preview.yml --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000/blog-teaching/>. The preview rebuilds when you edit a post, layout, or stylesheet. Restart the command after changing configuration. Press Control-C to stop it. If dependencies are missing, run `bundle install` first.

The preview settings show future-dated posts and supply a site description locally so the GitHub metadata plugin does not need to fetch it from GitHub. They do not change the production configuration.

## Add a blog post

The page shows every post in full, newest first, with Shiro Kuriwaki's introduction pinned at the top. A lorem ipsum example credited to Tina Zeng (Pedagogy Fellow) is available locally for previewing; it is not part of the published blog.

1. Copy a file in `blog-teaching/_posts/`, naming it `YYYY-MM-DD-short-title.md`.
2. Edit its metadata and write the body in Markdown:

   ```yaml
   ---
   title: Your post title
   author: tina
   tags: [Teaching R, Classroom activities]
   summary: A one-sentence description for links and page metadata.
   ---
   ```

3. Use an author key from `_data/authors.yml`, or add a new entry there with `name` and an optional `role`. The same record supplies the byline and feed attribution. The author keys are `tina` and `shiro`.
4. Preview the landing page and the individual post. The landing page shows complete posts; topic links jump to the matching post on that page, and each title links to an individual post page. Topic lists and previous/next links update automatically. The local preview includes future-dated posts; the live site shows them only in builds on or after their publication date.

To pin the introduction, set `pinned: true` in its metadata. Keep that setting on only one post; remove it or set it to `false` to unpin a post. The introduction stays at the top regardless of its date and appears only once. The other posts follow in reverse chronological order.

The default layout and URL pattern are set in `_config.yml`. These posts use `/blog-teaching/short-title/` addresses. Choose distinct filenames after the date so each post has a unique address.
