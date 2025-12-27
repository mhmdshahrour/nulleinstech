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
// 1️⃣ Send message to you
await emailjs.sendForm(
  "service_opiby0o",
  "template_fc26sxq",
  form
);

// 2️⃣ Send auto-reply to user (non-blocking)
emailjs.send(
  "service_opiby0o",
  "template_bjppy78",
  {
    full_name: form.full_name.value,
    email: form.email.value,
    subject: form.subject.value,
    preferred_contact: form.preferred_contact.value
  }
).catch(err => console.warn("Auto-reply failed:", err));


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
function validate(form) {
  let valid = true;

  // Validate all required fields EXCEPT checkbox
  form.querySelectorAll("[required]:not([type='checkbox'])").forEach(field => {
    const errorEl = field.closest("div")?.querySelector(".error-message");

    if (!field.checkValidity()) {
      field.classList.add("input-error");

      if (errorEl) {
        if (field.type === "email") {
          errorEl.textContent = "Please enter a valid email address.";
        } else if (field.name === "message") {
          errorEl.textContent = "Please enter at least 20 characters.";
        } else {
          errorEl.textContent = "This field is required.";
        }
      }

      if (valid) field.focus();
      valid = false;
    }
  });

  // ✅ Explicit consent validation (THIS WAS MISSING)
  const consent = form.querySelector("#consent");
  const consentError = consent.closest(".consent")?.nextElementSibling;

  if (!consent.checked) {
    consent.classList.add("input-error");

    if (consentError) {
      consentError.textContent =
        "You must agree to the privacy policy before submitting.";
      consentError.style.display = "block";
    }

    if (valid) consent.focus();
    valid = false;
  }

  return valid;
}


function clearErrors() {
  document.querySelectorAll(".input-error").forEach(el =>
    el.classList.remove("input-error")
  );

  document.querySelectorAll(".error-message").forEach(el => {
    el.textContent = "";
    el.style.display = "none";
  });
}



