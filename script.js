
document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav-links");
    const header = document.querySelector(".site-header");

    // Mobile navigation
    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                navigation.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Sticky header effect
    const updateHeader = () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 30);
        }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    // Automatic footer year
    document.querySelectorAll("[data-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll(
        ".section-heading, .section-copy, .mission-card, .team-card, .credential-row"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(element => {
            element.setAttribute("data-reveal", "");
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
    }
});
