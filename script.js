
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }

  // Dynamic footer year
  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // Header scroll effect
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Prevent selecting past appointment dates
  const dateInput = document.querySelector("#date");

  if (dateInput) {
    const today = new Date();
    const localDate = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localDate;
  }

  // Appointment enquiry form demo
  const contactForm = document.querySelector("#clinic-contact-form");
  const formStatus = document.querySelector("#form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      formStatus.textContent = "";

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formStatus.textContent =
        "Your enquiry form is complete. This demo does not send or save your request. Please call the clinic to confirm your appointment.";

      formStatus.style.color = "#2875a5";
      contactForm.reset();

      if (dateInput) {
        dateInput.min = [
          new Date().getFullYear(),
          String(new Date().getMonth() + 1).padStart(2, "0"),
          String(new Date().getDate()).padStart(2, "0")
        ].join("-");
      }
    });
  }
});
