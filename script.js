document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("QfFQC01HJDSrbhk9A");

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    statusEl.textContent = "";

    if (!validate(form)) return;

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
    } catch {
      statusEl.textContent =
        "Something went wrong. Please try again later.";
    }
  });
});

function validate(form) {
  let valid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    let errorEl;

    if (field.type === "checkbox") {
      errorEl = field.closest(".consent")?.nextElementSibling;
    } else {
      errorEl = field.closest("div")?.querySelector(".error-message");
    }

    if (!field.checkValidity()) {
      field.classList.add("input-error");

      if (errorEl) {
        if (field.type === "email") {
          errorEl.textContent = "Please enter a valid email address.";
        } else if (field.type === "checkbox") {
          errorEl.textContent =
            "You must agree to the privacy policy before submitting.";
        } else if (field.name === "message") {
          errorEl.textContent =
            "Please enter a message of at least 20 characters.";
        } else {
          errorEl.textContent = "This field is required.";
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

