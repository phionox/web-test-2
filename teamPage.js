// Sélection des éléments
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalText = document.getElementById("modalText");

// Fonction pour ouvrir la modale
function openModal(imageSrc, text) {
  modal.style.display = "flex";
  modalImg.src = imageSrc;
  modalText.textContent = text;
}

// Fonction pour fermer la modale
function closeModal() {
  modal.style.display = "none";
}
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
})
