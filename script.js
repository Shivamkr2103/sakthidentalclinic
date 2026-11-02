
/* =========================================
   SAKTHI DENTAL CLINIC
   COMPLETE WEBSITE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#main-navigation");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        // Close navigation after clicking a link
        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";

            });

        });

    }

    // AUTOMATIC COPYRIGHT YEAR
    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // SCROLL REVEAL ANIMATION
    const revealElements = document.querySelectorAll(
        ".section-heading, .feature-card, .treatment-card, .mission-card, .team-card, .contact-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, currentObserver) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        currentObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {

            element.classList.add("reveal");
            observer.observe(element);

        });

    }

    // CONTACT FORM DEMO
    const contactForm = document.querySelector("#clinic-contact-form");
    const formStatus = document.querySelector("#form-status");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();
                return;

            }

            formStatus.textContent =
                "Your form is valid. This demo does not send your message. Please contact the clinic directly.";

            formStatus.style.color = "#2875a5";

            contactForm.reset();

        });

    }

    // FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer = question.nextElementSibling;

            if (!answer) return;

            const isExpanded =
                question.getAttribute("aria-expanded") === "true";

            question.setAttribute("aria-expanded", String(!isExpanded));

            answer.hidden = isExpanded;

        });

    });

});
