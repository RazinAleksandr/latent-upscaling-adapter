/* LUA project page — copy-to-clipboard + before/after slider. No dependencies. */
(function () {
  "use strict";

  /* ---- Copy BibTeX ---- */
  var btn = document.getElementById("copy-bibtex");
  var pre = document.getElementById("bibtex-text");
  if (btn && pre) {
    btn.addEventListener("click", function () {
      var text = pre.innerText;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(function () { btn.textContent = old; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        var r = document.createRange();
        r.selectNode(pre);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        try { document.execCommand("copy"); done(); } catch (e) {}
        sel.removeAllRanges();
      }
    });
  }

  /* ---- Before/after image comparison slider ---- */
  var slider = document.getElementById("ba-slider");
  if (slider) {
    var before = slider.querySelector(".before");
    var handle = slider.querySelector(".handle");
    var dragging = false;

    function setPos(clientX) {
      var rect = slider.getBoundingClientRect();
      var pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
      handle.style.left = pct + "%";
    }
    function start(e) { dragging = true; move(e); }
    function stop() { dragging = false; }
    function move(e) {
      if (!dragging) return;
      var x = e.touches ? e.touches[0].clientX : e.clientX;
      setPos(x);
      if (e.cancelable) e.preventDefault();
    }

    slider.addEventListener("mousedown", start);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    slider.addEventListener("touchstart", start, { passive: false });
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", stop);

    // start at the midpoint
    before.style.clipPath = "inset(0 50% 0 0)";
  }
})();
