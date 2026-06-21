const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".nav a")];
const toast = document.querySelector(".toast");

const previewCopy = {
  shipping: "Published apps, store-ready flows, and launch details handled with a product mindset.",
  systems: "Firebase, REST APIs, maps, payments, notifications, auth, dashboards, and admin workflows.",
  quality: "Polished UI, edge states, QA fixes, release assets, and post-launch maintenance.",
};

window.addEventListener("pointermove", (event) => {
  document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelectorAll(".app-grid a").forEach((card) => {
      card.classList.toggle("is-hidden", filter !== "all" && card.dataset.platform !== filter);
    });
  });
});

document.querySelectorAll(".preview-pill").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".preview-pill").forEach((item) => item.classList.toggle("is-active", item === button));
    document.querySelector("#preview-copy").textContent = previewCopy[button.dataset.preview];
  });
});

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast("Copied to clipboard");
    } catch {
      showToast(button.dataset.copy);
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll("[data-count]").forEach((stat) => statObserver.observe(stat));

function animateCount(element) {
  const target = Number(element.dataset.count);
  const duration = 850;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.round(target * progress);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean)
  .forEach((section) => sectionObserver.observe(section));
