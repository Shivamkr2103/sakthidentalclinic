
document.addEventListener("DOMContentLoaded", () => {

  // 1. Mobile navigation
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

  // 2. Dynamic footer year
  document.querySelectorAll("[data-year]").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  // 3. Header scroll effect
  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 30);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // 4. Appointment date validation
  const dateInput = document.querySelector("#date");

  const setMinimumDate = () => {
    if (!dateInput) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
  };

  setMinimumDate();

  // 5. Appointment enquiry form
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
        "Your enquiry form is complete. This demo does not send or save your request. Please contact the clinic directly to confirm your appointment.";

      formStatus.style.color = "#2875a5";

      contactForm.reset();
      setMinimumDate();
    });

  }

});
