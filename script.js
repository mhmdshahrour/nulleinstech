document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("QfFQC01HJDSrbhk9A");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    statusEl.textContent = "";

    if (!validateForm(form)) return;

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

    } catch (err) {
      console.error(err);
      statusEl.textContent =
        "Something went wrong. Please try again later.";
    }
  });
});

/* ---------- Validation ---------- */

function validateForm(form) {
  let valid = true;

  form.querySelectorAll("[required]").forEach(field => {
    const errorEl = field.nextElementSibling;

    if (!field.checkValidity()) {
      field.classList.add("input-error");

      if (errorEl) {
        if (field.validity.valueMissing) {
          errorEl.textContent = "This field is required.";
        } else if (field.type === "email") {
          errorEl.textContent = "Please enter a valid email address.";
        } else if (field.name === "message") {
          errorEl.textContent = "Message must be at least 20 characters.";
        } else if (field.type === "checkbox") {
          errorEl.textContent = "You must agree before submitting.";
        } else {
          errorEl.textContent = "Please correct this field.";
        }
      }

      if (valid) field.focus();
      valid = false;
    }
  });

  return valid;
}

function clearErrors() {
  document.querySelectorAll(".input-error").forEach(el =>
    el.classList.remove("input-error")
  );
  document.querySelectorAll(".error-message").forEach(el =>
    el.textContent = ""
  );
}

