<https://www.kuriwaki.github.io>, rerouted to <https://www.shirokuriwaki.com>

## Preview the teaching blog

From this repository's directory, run:

```bash
bundle exec jekyll serve --safe --config _config.yml,_config_preview.yml --host 127.0.0.1 --port 4000
```

Open <http://127.0.0.1:4000/blog-teaching/>. The preview rebuilds when you edit a post, layout, or stylesheet. Restart the command after changing configuration. Press Control-C to stop it. If dependencies are missing, run `bundle install` first.

The preview settings supply a site description locally so the GitHub metadata plugin does not need to fetch it from GitHub. Both the preview and the live site hide future-dated posts by default. To preview a scheduled post early, add `--future` to the preview command.

## Add a blog post

The page shows posts newest first. "About the class" and "About Tina" links in the sidebar lead to their introductory posts. The sidebar also contains the blog title, description, and links to posts and topics. Short posts appear in full; longer posts show a preview of up to 100 words and a "Read more" link. Individual post pages always show the full text.

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
4. Preview the landing page and the individual post. Topic links jump to the matching post on the landing page, and each title or "Read more" link opens the full post. Topic lists and previous/next links update automatically. Posts stay hidden until a build on or after the date in their filename.

To add an image, save it in `blog-teaching/images/` and reference it from the post with a description of the image and an optional italic caption on the next line:

```markdown
![What the image shows](/blog-teaching/images/my-image.png)
*Caption shown under the image.*
```

Images shrink to fit the column automatically.

To end a preview earlier, put `<!--more-->` on its own line, with a blank line before and after it. The landing page shows the content before that marker, capped at 100 words, followed by "Read more". Without that marker, posts longer than 100 words use a plain-text preview of the first 100 words. Change `teaching_blog.preview_words` in `_config.yml` to adjust the limit.

The default layout and URL pattern are set in `_config.yml`. These posts use `/blog-teaching/short-title/` addresses. Choose distinct filenames after the date so each post has a unique address.
