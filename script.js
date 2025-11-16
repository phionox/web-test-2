/* Consolidated site JS: product viewer, pricing color selector, support helpers
   Filename: script.js (corrected) */

(function featureModule(){
  function $(s, c=document){ return c.querySelector(s); }
  function $$(s, c=document){ return Array.from(c.querySelectorAll(s)); }

  const viewer = $('.viewer');
  const frame  = $('#photo-frame');
  const imgEl  = $('#product-image');
  const nameEl = $('#product-name');
  const descEl = $('#product-desc');
  const leftBtn  = $('.arrow-left');
  const rightBtn = $('.arrow-right');

  if (document.getElementById('product-data') && viewer && frame && imgEl) {
    const items = $$('#product-data li').map(li => ({
      image: li.dataset.image || '',
      name : li.dataset.name  || 'Product name',
      desc : li.dataset.desc  || 'Product description'
    }));

    let i = 0;

    function show(index){
      if (!items.length) return;
      i = (index + items.length) % items.length;

      viewer.classList.remove('bounce'); void viewer.offsetWidth;
      viewer.classList.add('bounce');

      const next = new Image();
      next.onload = () => {
        imgEl.src = next.src;
        imgEl.alt = items[i].name || 'Product photo';
        frame.classList.add('loaded');
        imgEl.classList.remove('ready');
        requestAnimationFrame(() => imgEl.classList.add('ready'));
      };
      next.src = items[i].image || '';

      nameEl && (nameEl.textContent = items[i].name);
      descEl && (descEl.textContent = items[i].desc);
    }

    leftBtn?.addEventListener('click',  () => show(i - 1));
    rightBtn?.addEventListener('click', () => show(i + 1));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });
    document.addEventListener('DOMContentLoaded', () => show(0));
  }
})();

(function pricingModule(){
  document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.color-row');
    if (!rows || rows.length === 0) return;

    rows.forEach(row => {
      const productKey = row.dataset.product;
      const imgEl = document.getElementById(productKey === 'basic' ? 'basic-img' : 'battery-img');
      const dots = Array.from(row.querySelectorAll('.color-dot'));
      if (!dots.length) return;

      dots.forEach(btn => {
        btn.setAttribute('type','button');
        btn.setAttribute('role','button');
        btn.setAttribute('tabindex','0');
        btn.setAttribute('aria-pressed', btn.classList.contains('selected') ? 'true' : 'false');

        btn.addEventListener('click', () => selectColor(btn));
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
        });
      });

      const initial = dots.find(d => d.classList.contains('selected')) ||
                      dots.find(d => (d.dataset.image || '').toLowerCase().includes('black')) ||
                      dots[0];
      if (initial) selectColor(initial, true);

      function selectColor(button, skipFocus = false) {
        if (!button) return;
        const src = button.dataset.image;
        if (!src) return;
        dots.forEach(d => {
          const isActive = d === button;
          d.classList.toggle('selected', isActive);
          d.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        preloadAndSwap(imgEl, src);
        if (!skipFocus) button.focus();
      }

      function preloadAndSwap(imgEl, src) {
        if (!imgEl) return;
        imgEl.style.transition = 'opacity 140ms linear';
        imgEl.style.opacity = '0';
        const pre = new Image();
        pre.onload = () => {
          setTimeout(() => {
            imgEl.src = src;
            requestAnimationFrame(() => { imgEl.style.opacity = '1'; });
          }, 140);
        };
        pre.src = src;
      }
    });
  });
})();

(function supportModule(){
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    if (tabs && tabs.length) {
      tabs.forEach(btn => btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-target');
        if (!id) return;
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        const target = document.getElementById(id);
        target && target.classList.add('active');
        btn.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }));
    }
    document.querySelectorAll('.faq-item').forEach(item => item.addEventListener('click', () => item.classList.toggle('open')));
  });
})();