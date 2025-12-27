document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("QfFQC01HJDSrbhk9A");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  if (!form || !statusEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "";
    clearErrors();

    if (!form.checkValidity()) {
      showValidationErrors(form);
      return;
    }

    statusEl.textContent = "Sending message...";

    try {
      await emailjs.sendForm(
        "service_opiby0o",
        "template_fc26sxq",
        form
      );

      statusEl.textContent =
        "Thank you. Your message has been successfully received.";
      form.reset();

    } catch (error) {
      console.error("EmailJS error:", error);
      statusEl.textContent =
        "Something went wrong. Please try again later.";
    }
  });
});

/* --- Helpers --- */

function showValidationErrors(form) {
  const firstInvalid = form.querySelector(":invalid");
  if (firstInvalid) {
    firstInvalid.classList.add("input-error");
    firstInvalid.focus();
  }
}

function clearErrors() {
  document
    .querySelectorAll(".input-error")
    .forEach(el => el.classList.remove("input-error"));
}
