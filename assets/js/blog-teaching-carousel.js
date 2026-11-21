// # Written by Claude Code
(function () {
  "use strict";

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".notes-carousel-track");
    var slides = Array.from(track.querySelectorAll(".notes-carousel-slide"));
    var controls = carousel.querySelector(".notes-carousel-controls");
    var status = carousel.querySelector(".notes-carousel-status");
    var current = 0;
    if (slides.length < 2) return;

    // Without JavaScript the track stays a swipeable strip; with it, show the arrows.
    controls.hidden = false;

    function show(index) {
      current = (index + slides.length) % slides.length;
      track.scrollTo({ left: current * track.clientWidth, behavior: "smooth" });
      status.textContent = current + 1 + " of " + slides.length;
    }

    carousel.querySelector(".notes-carousel-prev").addEventListener("click", function () { show(current - 1); });
    carousel.querySelector(".notes-carousel-next").addEventListener("click", function () { show(current + 1); });

    track.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") { event.preventDefault(); show(current - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); show(current + 1); }
    });

    // Keep the counter in sync when readers swipe instead of using the arrows.
    var scrollTimer;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () {
        var index = Math.round(track.scrollLeft / track.clientWidth);
        if (index !== current && slides[index]) {
          current = index;
          status.textContent = current + 1 + " of " + slides.length;
        }
      }, 100);
    });
  });
})();
