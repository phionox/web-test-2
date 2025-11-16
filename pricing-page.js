// Pricing page color selector logic
document.addEventListener('DOMContentLoaded', () => {
  // For each color-row, set up click handlers and initial selection if needed
  document.querySelectorAll('.color-row').forEach(row => {
    const productKey = row.dataset.product; // "basic" or "battery"
    const imgEl = document.getElementById(productKey === 'basic' ? 'basic-img' : 'battery-img');

    // Initialize: if any button has .selected, use it; otherwise pick the first
    let initialBtn = row.querySelector('.color-dot.selected') || row.querySelector('.color-dot');
    if (initialBtn) {
      setProductImage(imgEl, initialBtn.dataset.image);
      setSelected(row, initialBtn);
    }

    // Click handler
    row.addEventListener('click', (e) => {
      const btn = e.target.closest('.color-dot');
      if (!btn) return;
      setProductImage(imgEl, btn.dataset.image);
      setSelected(row, btn);
    });

    // Keyboard accessibility (Enter / Space)
    row.querySelectorAll('.color-dot').forEach(btn => {
      btn.setAttribute('tabindex', '0');
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  });

  function setProductImage(imgEl, src) {
    if (!imgEl) return;
    // fade transition
    imgEl.style.opacity = 0;
    setTimeout(() => {
      imgEl.src = src;
      imgEl.style.opacity = 1;
    }, 140);
  }

  function setSelected(row, activeBtn) {
    row.querySelectorAll('.color-dot').forEach(b => b.classList.remove('selected'));
    activeBtn.classList.add('selected');
  }
});

