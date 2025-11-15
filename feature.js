// ===== helpers
const $  = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => Array.from(c.querySelectorAll(s));

// ===== elements
const viewer   = $('.viewer');
const frame    = $('#photo-frame');
const imgEl    = $('#product-image');
const nameEl   = $('#product-name');
const descEl   = $('#product-desc');
const leftBtn  = $('.arrow-left');
const rightBtn = $('.arrow-right');

// ===== data (depuis la liste cachée)
const items = $$('#product-data li').map(li => ({
  image: li.dataset.image || '',
  name : li.dataset.name  || 'Product name',
  desc : li.dataset.desc  || 'Product description'
}));

let i = 0;

// ===== load & display
function show(index){
  if (!items.length) return;

  i = (index + items.length) % items.length;

  // effet rebond
  viewer.classList.remove('bounce'); void viewer.offsetWidth;
  viewer.classList.add('bounce');

  // préchargement pour une transition fluide
  const next = new Image();
  next.onload = () => {
    imgEl.src = next.src;
    imgEl.alt = items[i].name || 'Product photo';
    frame.classList.add('loaded');
    imgEl.classList.remove('ready');
    requestAnimationFrame(() => imgEl.classList.add('ready'));
  };
  next.src = items[i].image || '';

  nameEl.textContent = items[i].name;
  descEl.textContent = items[i].desc;
}

// ===== controls (bas uniquement)
leftBtn?.addEventListener('click',  () => show(i - 1));
rightBtn?.addEventListener('click', () => show(i + 1));

// clavier
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  show(i - 1);
  if (e.key === 'ArrowRight') show(i + 1);
});

// init
document.addEventListener('DOMContentLoaded', () => show(0));
