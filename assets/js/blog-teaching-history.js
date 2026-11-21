// # Written by Codex
(function () {
  "use strict";

  var footer = document.querySelector(".notes-revisions");
  if (!footer || !window.fetch) return;

  var repository = footer.dataset.repository;
  var path = footer.dataset.sourcePath;
  var ref = footer.dataset.sourceRef;
  var cacheKey = "notes-last-edited:v1:" + repository + ":" + ref + ":" + path;
  var cacheLifetime = 15 * 60 * 1000;
  var formatter = new Intl.DateTimeFormat("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York"
  });

  function readCache() {
    try {
      var cached = JSON.parse(sessionStorage.getItem(cacheKey));
      if (cached && Date.now() - cached.savedAt < cacheLifetime &&
          typeof cached.editedAt === "string" && Number.isFinite(Date.parse(cached.editedAt))) return cached.editedAt;
    } catch (error) {
      // Browsing with storage disabled should still load the date.
    }
    return null;
  }

  function showDate(editedAt) {
    var label = footer.querySelector(".notes-last-edited");
    var time = document.createElement("time");
    time.dateTime = editedAt;
    time.textContent = formatter.format(new Date(editedAt));
    label.textContent = "Last edited ";
    label.append(time, " · ");
    label.hidden = false;
  }

  async function loadDate() {
    var cached = readCache();
    if (cached !== null) {
      showDate(cached);
      return;
    }

    var url = new URL("https://api.github.com/repos/" + repository + "/commits");
    url.searchParams.set("path", path);
    url.searchParams.set("sha", ref);
    url.searchParams.set("per_page", "1");
    var controller = new AbortController();
    var timeout = window.setTimeout(function () { controller.abort(); }, 8000);

    try {
      var response = await fetch(url.href, {
        headers: { Accept: "application/vnd.github+json" },
        credentials: "omit",
        signal: controller.signal
      });
      if (!response.ok) throw new Error("History request failed");
      var commits = await response.json();
      if (!Array.isArray(commits) || commits.length > 1) throw new Error("Invalid history response");
      if (!commits.length) return;

      var editedAt = commits[0].commit.committer.date;
      if (typeof editedAt !== "string" || !Number.isFinite(Date.parse(editedAt))) {
        throw new Error("Invalid revision date");
      }
      showDate(editedAt);

      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), editedAt: editedAt }));
      } catch (error) {
        // The footer also works without a cache.
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }

  loadDate().catch(function () {
    // Keep the history link usable when a date cannot be loaded.
  });
})();
