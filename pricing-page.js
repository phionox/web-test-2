// Show/Hide description
function toggleDescription(element) {
  const description = element.nextElementSibling.nextElementSibling;
  description.style.display =
    description.style.display === "block" ? "none" : "block";
  element.style.color = "#ff6600";
}

// Change product image when color button clicked
function changeColor(button, imagePath) {
  const productSection = button.closest(".product");
  const img = productSection.querySelector(".product-img");
  img.src = imagePath;
}
