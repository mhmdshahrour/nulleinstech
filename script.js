document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("QfFQC01HJDSrbhk9A"); // PUBLIC KEY

  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("status");

  if (!form || !statusEl) {
    console.error("Form or status element not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending message...";

    try {
      await emailjs.sendForm(
        "service_opiby0o",     // SERVICE ID
        "template_fc26sxq",    // TEMPLATE ID
        form
      );

      statusEl.textContent =
        "Thank you! Your message has been received. The NullEinsTech team will contact you shortly.";
      form.reset();

    } catch (error) {
      console.error("EmailJS error:", error);
      statusEl.textContent =
        "Failed to send message. Please try again later.";
    }
  });
});
