// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  if (!hamburger || !sidebar) return;

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    sidebar.classList.toggle("open");
  });

  // Close menu when a nav link is clicked
  sidebar.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      sidebar.classList.remove("open");
    });
  });

  // Close menu when clicking outside the sidebar
  document.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });
});

// Disable right-click on images
document.addEventListener("contextmenu", function (e) {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});

// Form validation and submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("status-message");

  if (!form) return; // Prevents errors if the form is not on this page

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Clear previous messages
    statusMessage.textContent = "";
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(el => el.textContent = "");

    // Validate fields
    let isValid = true;

    const name = form.name.value.trim();
    if (!name) {
      document.getElementById("name-error").textContent = "Please enter your fullname.";
      isValid = false;
    }

    const phone = form.phone.value.trim();
    if (!/^\d{10}$/.test(phone)) {
      document.getElementById("phone-error").textContent = "Enter a valid 10-digit phone number.";
      isValid = false;
    }

    const email = form.email.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      document.getElementById("email-error").textContent = "Enter a valid email address.";
      isValid = false;
    }

    const message = form.message.value.trim();
    if (!message) {
      document.getElementById("message-error").textContent = "Please enter a message.";
      isValid = false;
    }

    if (!isValid) return;

    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert("Thank you! Your message has been sent.");
      form.reset();
      window.location.href = "index.html";
    } else {
      statusMessage.textContent = "Oops! Something went wrong. Please try again.";
      statusMessage.style.color = "red";
    }
  });
});