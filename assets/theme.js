// Light/dark theme toggle. Loaded in <head> without defer so a saved
// choice applies before the first paint. With no saved choice the page
// follows the system setting through CSS alone.
(function () {
  var root = document.documentElement;
  var KEY = "theme";

  function saved() {
    try {
      var t = localStorage.getItem(KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function current() {
    return root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }

  var initial = saved();
  if (initial) root.setAttribute("data-theme", initial);

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme-toggle");
    if (!button) return;

    function label() {
      var next = current() === "light" ? "dark" : "light";
      button.setAttribute("aria-label", "Switch to " + next + " theme");
    }

    button.addEventListener("click", function () {
      var next = current() === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });

    matchMedia("(prefers-color-scheme: light)").addEventListener("change", label);

    label();
    button.hidden = false;
  });
})();
