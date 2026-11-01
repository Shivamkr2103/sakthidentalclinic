// Shared interactions for Sakthi Dental Clinic website
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }));
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // The contact form is a front-end demo. It validates fields but does not transmit data.
  const form = document.getElementById("clinic-contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please check the required fields and try again.";
        return;
      }
      status.textContent = "Thank you! The form demo validated successfully. To receive enquiries, connect this form to a secure form service before launch.";
      form.reset();
    });
  }

  // Add a subtle reveal when supported, while keeping content visible without JS.
  const revealItems = document.querySelectorAll(".feature-card, .treatment-card, .testimonial-card, .team-card");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => {
      item.style.opacity = "0";
      item.style.transform = "translateY(12px)";
      item.style.transition = "opacity .5s ease, transform .5s ease";
      observer.observe(item);
    });
    const style = document.createElement("style");
    style.textContent = ".is-visible{opacity:1!important;transform:translateY(0)!important}";
    document.head.appendChild(style);
  }
});
