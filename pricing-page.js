function toggleDescription(element) {
  const description = element.nextElementSibling.nextElementSibling;
  description.style.display = description.style.display === 'block' ? 'none' : 'block';
  element.style.color = '#ff6600';
}

