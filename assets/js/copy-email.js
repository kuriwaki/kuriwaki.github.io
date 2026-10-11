// # Written by Codex
(function () {
  "use strict";

  function fallbackCopy(text) {
    var previousFocus = document.activeElement;
    var textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      if (!document.execCommand("copy")) {
        throw new Error("The browser rejected the clipboard operation.");
      }
    } finally {
      textarea.remove();
      if (previousFocus) previousFocus.focus();
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        fallbackCopy(text);
      });
    }
    return new Promise(function (resolve, reject) {
      try {
        fallbackCopy(text);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  document.querySelectorAll("[data-copy-email]").forEach(function (button) {
    var timeout;

    function showStatus(message, state) {
      window.clearTimeout(timeout);
      button.setAttribute("data-copy-state", state);
      button.textContent = message;
      timeout = window.setTimeout(function () {
        button.removeAttribute("data-copy-state");
        button.textContent = "Copy Email";
      }, 1800);
    }

    button.addEventListener("click", function () {
      copyText(button.getAttribute("data-copy-email")).then(function () {
        showStatus("Copied!", "success");
      }).catch(function () {
        showStatus("Copy failed", "error");
      });
    });
  });
}());
