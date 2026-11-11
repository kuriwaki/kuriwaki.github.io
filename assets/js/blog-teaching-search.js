// # Written by Codex
(function () {
  "use strict";

  var search = document.querySelector(".notes-search");
  if (!search) return;

  var input = document.getElementById("notes-search-input");
  var clear = document.getElementById("notes-search-clear");
  var status = document.getElementById("notes-search-status");
  var empty = document.getElementById("notes-search-empty");
  var posts = Array.from(document.querySelectorAll("#posts .notes-entry"));
  var entries = posts.map(function (post) {
    return { element: post, text: post.dataset.searchText.toLowerCase() };
  });
  // Add whole-word exceptions here; other keywords match inside words.
  var wholeWordPatterns = new Map([["ai", /\bai\b/]]);

  function filterPosts() {
    var query = input.value.trim().toLowerCase();
    var keywords = query ? query.split(/\s+/) : [];
    var count = 0;

    entries.forEach(function (entry) {
      var matches = keywords.every(function (keyword) {
        var pattern = wholeWordPatterns.get(keyword);
        return pattern ? pattern.test(entry.text) : entry.text.includes(keyword);
      });
      entry.element.hidden = !matches;
      if (matches) count += 1;
    });

    var noun = posts.length === 1 ? "post" : "posts";
    status.textContent = query
      ? count + " of " + posts.length + " " + noun
      : "Showing all " + posts.length + " " + noun;
    empty.hidden = count !== 0;
    clear.disabled = input.value.length === 0;
  }

  input.addEventListener("input", filterPosts);
  clear.addEventListener("click", function () {
    input.value = "";
    filterPosts();
    input.focus();
  });

  filterPosts();
  search.hidden = false;
})();
