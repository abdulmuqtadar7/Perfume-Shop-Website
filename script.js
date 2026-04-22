const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

const filterTabs = document.querySelectorAll(".filter-tabs button");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    filterTabs.forEach((button) => button.classList.remove("active"));
    tab.classList.add("active");
  });
});

document.querySelector(".newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#email");
  const status = document.querySelector("#newsletter-status");
  if (!(input instanceof HTMLInputElement)) return;
  if (!(status instanceof HTMLParagraphElement)) return;
  input.value = "";
  status.textContent = "Thank you for subscribing. You are now on the insider list.";
});
