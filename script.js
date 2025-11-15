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
