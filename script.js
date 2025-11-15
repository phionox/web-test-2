/* FEATURE TABS */
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;

        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        tabContents.forEach(content => {
            content.classList.remove("active");
            if (content.id === tab) content.classList.add("active");
        });
    });
});

/* PRODUCT DESCRIPTION TOGGLE */
document.querySelectorAll(".desc-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const desc = btn.nextElementSibling;
        desc.classList.toggle("show");
    });
});
/* TEAM PAGE – MODAL */
function openModal(imgSrc, text) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    const modalText = document.getElementById("modalText");

    modal.style.display = "flex";
    modalImg.src = imgSrc;
    modalText.textContent = text;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}
