const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  const elevated = window.scrollY > 8;
  header.style.boxShadow = elevated ? "0 10px 30px rgba(23, 32, 27, 0.08)" : "none";
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
