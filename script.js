/* ===========================================================================
   script.js - Consolidated JS for the site
   Combines: feature.js, pricing-page.js, teamPage.js, inline support scripts
   Defensive: checks for element existence before acting
   Exposes window.showTab and window.toggleFaq for inline onclick compatibility
   =========================================================================== */

(function () {
  // Helpers
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------------- Feature / Viewer Module ---------------- */
  (function viewerModule() {
    const viewer = $('.viewer');
    const frame  = $('#photo-frame');
    const imgEl  = $('#product-image');
    const nameEl = $('#product-name');
    const descEl = $('#product-desc');
    const leftBtn  = $('.arrow-left');
    const rightBtn = $('.arrow-right');
    const dataList = $('#product-data');

    if (!dataList || !viewer || !frame || !imgEl) return;

    const items = $$('#product-data li').map(li => ({
      image: li.dataset.image || '',
      name : li.dataset.name  || '',
      desc : li.dataset.desc  || ''
    }));
    if (!items.length) return;

    let i = 0;
    function show(index) {
      if (!items.length) return;
      i = (index + items.length) % items.length;

      // add subtle bounce animation if viewer exists
      viewer.classList.remove('bounce');
      // force reflow to restart animation
      void viewer.offsetWidth;
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

      if (nameEl) nameEl.textContent = items[i].name;
      if (descEl) descEl.textContent = items[i].desc;
    }

    leftBtn?.addEventListener('click', () => show(i - 1));
    rightBtn?.addEventListener('click', () => show(i + 1));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(i - 1);
      if (e.key === 'ArrowRight') show(i + 1);
    });

    // Show first item on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => show(0));
  })();

  /* ---------------- Pricing Module (color selectors) ---------------- */
  (function pricingModule() {
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

  /* ---------------- Team module - nav active handling ---------------- */
  (function teamModule() {
    document.addEventListener('DOMContentLoaded', () => {
      // Make header nav links set an "active" class on click (useful if .nav-item not present)
      const navLinks = document.querySelectorAll('.header-nav a');
      if (!navLinks || navLinks.length === 0) return;
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    });
  })();

  /* ---------------- Support module (tabs + faq) ---------------- */
  (function supportModule() {
    // Expose global functions for backward compatibility with inline onclick attributes
    window.showTab = function(tabId) {
      try {
        const sections = document.querySelectorAll('.content-section');
        const buttons = document.querySelectorAll('.tab-btn');
        if (sections) sections.forEach(s => s.classList.remove('active'));
        if (buttons) buttons.forEach(b => b.classList.remove('active'));
        const target = document.getElementById(tabId);
        if (target) target.classList.add('active');
        // if called from an event handler with event available, mark the source button active
        try { if (window.event && window.event.target) window.event.target.classList.add('active'); } catch(e){}
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        // silent
      }
    };

    window.toggleFaq = function(el) {
      if (!el) return;
      el.classList.toggle('open');
    };

    document.addEventListener('DOMContentLoaded', () => {
      const tabs = document.querySelectorAll('.tab-btn');
      if (tabs && tabs.length) {
        tabs.forEach(btn => btn.addEventListener('click', (e) => {
          const id = btn.getAttribute('data-target') || (btn.getAttribute('onclick')?.match(/showTab\('(.*?)'\)/)?.[1]);
          if (!id) return;
          document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          const target = document.getElementById(id);
          target && target.classList.add('active');
          btn.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }));
      }

      // FAQ: make the toggle work without inline onclick
      document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('open'));
      });
    });
  })();

})(); // end of script.js
