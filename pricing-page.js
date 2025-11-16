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
  
  // Remove selected class from all buttons in this product section
  const allButtons = productSection.querySelectorAll(".color-btn");
  allButtons.forEach(btn => btn.classList.remove("selected"));
  
  // Add selected class to the clicked button
  button.classList.add("selected");
}
