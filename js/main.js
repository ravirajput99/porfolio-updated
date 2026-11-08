/*
 * Portfolio JavaScript — Ravi Rajput
 * Mobile nav, contact form, and theme toggle behavior.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initContactForm();
  initThemeToggle();
  initYear();
  initScrollEffects();
});

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const links = document.querySelectorAll(".nav-menu a");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking a link
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  const status = document.getElementById("form-status");

  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Simulate sending (replace with a real endpoint when you're ready)
    status.textContent = "Sending…";
    status.style.color = "var(--color-text-muted)";

    setTimeout(() => {
      status.textContent =
        "Thanks! Your message has been sent. I'll get back to you soon.";
      status.style.color = "var(--color-accent)";
      form.reset();
    }, 1200);
  });
}

/* ---------- Theme toggle (respects system preference) ---------- */
function initThemeToggle() {
  // No toggle button in this version — system preference is used via
  // @media (prefers-color-scheme). Hook kept for future use.
}

/* ---------- Current year in footer ---------- */
function initYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Subtle scroll effects ---------- */
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -80px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".section-header, .skill-category, .project-card, .timeline-item, .contact-card"
    )
    .forEach((el) => observer.observe(el));
}

// Fade-in class for scroll-revealed elements
const style = document.createElement("style");
style.textContent = `
  .section-header,
  .skill-category,
  .project-card,
  .timeline-item,
  .contact-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .section-header.is-visible,
  .skill-category.is-visible,
  .project-card.is-visible,
  .timeline-item.is-visible,
  .contact-card.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);