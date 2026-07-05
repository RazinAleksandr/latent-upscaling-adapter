/* LUA project page — sticky nav, BibTeX copy, drag-compare slider. No dependencies. */
(function () {
  "use strict";

  /* ---- Sticky nav + reading progress ---- */
  var nav = document.getElementById("topnav");
  var prog = document.getElementById("scroll-progress");
  var hero = document.querySelector(".hero");
  if (nav && prog) {
    var onScroll = function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      var threshold = hero ? hero.offsetHeight - 90 : 400;
      nav.classList.toggle("show", y > threshold);
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Copy BibTeX ---- */
  var btn = document.getElementById("copy-bibtex");
  var pre = document.getElementById("bibtex-text");
  if (btn && pre) {
    btn.addEventListener("click", function () {
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1500);
      };
      var fallback = function () {
        var r = document.createRange();
        r.selectNode(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        try { document.execCommand("copy"); done(); } catch (e) {}
        sel.removeAllRanges();
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(pre.innerText).then(done, fallback);
      } else { fallback(); }
    });
  }

  /* ---- Drag-compare slider ---- */
  var slider = document.getElementById("ba-slider");
  if (slider) {
    var before = slider.querySelector(".pane.before");
    var divider = slider.querySelector(".divider");
    var knob = slider.querySelector(".knob");
    var pos = 50;
    var dragging = false;

    function render() {
      before.style.clipPath = "inset(0 " + (100 - pos) + "% 0 0)";
      divider.style.left = pos + "%";
      knob.style.left = pos + "%";
      slider.setAttribute("aria-valuenow", String(Math.round(pos)));
    }
    function setFromClientX(x) {
      var rect = slider.getBoundingClientRect();
      pos = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
      render();
    }

    slider.addEventListener("pointerdown", function (e) {
      dragging = true;
      slider.setPointerCapture(e.pointerId);
      setFromClientX(e.clientX);
    });
    slider.addEventListener("pointermove", function (e) {
      if (dragging) setFromClientX(e.clientX);
    });
    slider.addEventListener("pointerup", function () { dragging = false; });
    slider.addEventListener("pointercancel", function () { dragging = false; });

    slider.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 2;
      if (e.key === "ArrowLeft") { pos = Math.max(0, pos - step); render(); e.preventDefault(); }
      if (e.key === "ArrowRight") { pos = Math.min(100, pos + step); render(); e.preventDefault(); }
      if (e.key === "Home") { pos = 0; render(); e.preventDefault(); }
      if (e.key === "End") { pos = 100; render(); e.preventDefault(); }
    });

    render();

    /* Comparison chips: LUA vs its 1024 base (magnified) or vs direct 2048 (full frame) */
    var chipBase = document.getElementById("cmp-base");
    var chipDirect = document.getElementById("cmp-direct");
    var tagLeft = document.getElementById("tag-left");
    var imgBase = slider.querySelector(".pane.before .cmp-base");
    var imgDirect = slider.querySelector(".pane.before .cmp-direct");
    if (chipBase && chipDirect && imgBase && imgDirect) {
      var setMode = function (direct) {
        imgBase.classList.toggle("active", !direct);
        imgDirect.classList.toggle("active", direct);
        slider.classList.toggle("zoomed", !direct);
        chipBase.setAttribute("aria-pressed", String(!direct));
        chipDirect.setAttribute("aria-pressed", String(direct));
        if (tagLeft) {
          tagLeft.textContent = direct
            ? "Direct FLUX @ 2048²"
            : "Base 1024² → 2K (stretched)";
        }
      };
      chipBase.addEventListener("click", function () { setMode(false); });
      chipDirect.addEventListener("click", function () { setMode(true); });
    }
  }
})();
