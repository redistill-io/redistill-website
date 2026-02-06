// Shared client-side behavior: nav toggle, theme toggle, and docs search.

function toggleNav() {
  var mobile = document.getElementById("nav-mobile");
  if (mobile) {
    mobile.classList.toggle("open");
  }
}

function applyTheme(theme) {
  var root = document.documentElement;
  root.setAttribute("data-theme", theme);
}

function initTheme() {
  var stored = null;
  try {
    stored = window.localStorage.getItem("redistill-theme");
  } catch (_) {}

  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");

  applyTheme(theme);

  var btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    btn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  }
}

function initThemeToggle() {
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  btn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme") || "light";
    var next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      window.localStorage.setItem("redistill-theme", next);
    } catch (_) {}
    btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    btn.textContent = next === "dark" ? "Light mode" : "Dark mode";
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function initDocSearch() {
  var input = document.getElementById("doc-search-input");
  var resultsEl = document.getElementById("doc-search-results");
  if (!input || !resultsEl) return;

  var headings = Array.prototype.slice.call(document.querySelectorAll(".content h2, .content h3"));
  var index = headings.map(function (h) {
    if (!h.id) {
      var base = slugify(h.textContent || "section");
      var id = base;
      var counter = 1;
      while (document.getElementById(id)) {
        id = base + "-" + counter++;
      }
      h.id = id;
    }
    return { id: h.id, text: h.textContent || "" };
  });

  function renderResults(query) {
    resultsEl.innerHTML = "";
    if (!query || query.length < 2) {
      return;
    }
    var q = query.toLowerCase();
    var matches = index.filter(function (item) {
      return item.text.toLowerCase().indexOf(q) !== -1;
    });
    matches.slice(0, 20).forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + item.id;
      a.textContent = item.text;
      a.addEventListener("click", function () {
        var target = document.getElementById(item.id);
        if (target && typeof target.scrollIntoView === "function") {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      li.appendChild(a);
      resultsEl.appendChild(li);
    });
  }

  input.addEventListener("input", function (e) {
    renderResults(e.target.value);
  });
}

function initCodeCopy() {
  var blocks = document.querySelectorAll("pre > code");
  if (!blocks.length) return;

  blocks.forEach(function (codeEl) {
    var pre = codeEl.parentElement;
    if (!pre || pre.classList.contains("has-copy")) {
      return;
    }
    pre.classList.add("has-copy");
    pre.style.position = pre.style.position || "relative";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy";
    btn.textContent = "Copy";
    btn.addEventListener("click", function () {
      var text = codeEl.textContent || "";
      var done = function (ok) {
        if (!ok) return;
        var original = btn.textContent;
        btn.textContent = "Copied";
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 1500);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(function () {
            done(true);
          })
          .catch(function () {
            done(false);
          });
      } else {
        try {
          var textarea = document.createElement("textarea");
          textarea.value = text;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          document.body.appendChild(textarea);
          textarea.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(textarea);
          done(ok);
        } catch (_) {
          done(false);
        }
      }
    });

    pre.appendChild(btn);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  initThemeToggle();
  initDocSearch();
  initCodeCopy();
  // Run Prism after all deferred language components have loaded
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  }
});

