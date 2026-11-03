
document.addEventListener("DOMContentLoaded", function () {

  // Automatic copyright year
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after selecting a link
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      const originalText = submitButton.textContent;

      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
      formStatus.textContent = "";
      formStatus.className = "form-status";

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          formStatus.textContent =
            "Thank you! Your inquiry has been submitted successfully. We will get back to you soon.";

          formStatus.classList.add("success");
          contactForm.reset();

        } else {
          const result = await response.json();

          throw new Error(
            result.errors
              ? result.errors.map(error => error.message).join(", ")
              : "Unable to submit your inquiry."
          );
        }

      } catch (error) {
        formStatus.textContent =
          "Sorry, we couldn't submit your inquiry. Please try again or email us directly.";

        formStatus.classList.add("error");

        console.error("Form submission error:", error);

      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

});
