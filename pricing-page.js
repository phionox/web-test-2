// Pricing page color selector logic (improved)
// - per-button handlers (reliable click/keyboard behavior)
// - preload images before swap (smooth fade)
// - initial selection: prefer a .selected button, otherwise prefer an image that includes "black", otherwise first
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.color-row').forEach(row => {
    const productKey = row.dataset.product; // "basic" or "battery"
    const imgEl = document.getElementById(productKey === 'basic' ? 'basic-img' : 'battery-img');
    const dots = Array.from(row.querySelectorAll('.color-dot'));

    // Add keyboard & role/accessibility attributes
    dots.forEach(btn => {
      btn.setAttribute('type', 'button');
      btn.setAttribute('role', 'button');
      btn.setAttribute('tabindex', '0');
      btn.setAttribute('aria-pressed', btn.classList.contains('selected') ? 'true' : 'false');
      // click handler for each button
      btn.addEventListener('click', () => {
        selectColor(btn);
      });
      // keyboard support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });

    // Choose initial button: .selected > black variant > first
    const initial = dots.find(d => d.classList.contains('selected')) ||
                    dots.find(d => (d.dataset.image || '').toLowerCase().includes('black')) ||
                    dots[0];
    if (initial) selectColor(initial, /*skipFocus*/ true);

    function selectColor(button, skipFocus = false) {
      if (!button) return;
      const src = button.dataset.image;
      if (!src) return;
      // update selected state and aria attributes
      dots.forEach(d => {
        const isActive = d === button;
        d.classList.toggle('selected', isActive);
        d.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      // preload then swap with fade
      preloadAndSwap(imgEl, src);
      if (!skipFocus) button.focus();
    }

    function preloadAndSwap(imgEl, src) {
      if (!imgEl) return;
      // fade out quickly
      imgEl.style.transition = 'opacity 140ms linear';
      imgEl.style.opacity = '0';
      const pre = new Image();
      pre.onload = () => {
        // after a short delay swap, then fade in
        setTimeout(() => {
          imgEl.src = src;
          // ensure reflow for transition
          requestAnimationFrame(() => {
            imgEl.style.opacity = '1';
          });
        }, 140);
      };
      pre.src = src;
    }
  });
});
