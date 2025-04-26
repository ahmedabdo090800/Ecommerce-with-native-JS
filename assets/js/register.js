document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register_form");
  const alertPlaceholder = document.getElementById("alert_placeholder");

  function showAlert(message) {
    alertPlaceholder.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }

  function validateInputs(name, phone, email, password) {
    const nameRegex = /^[a-zA-Z ]{3,50}$/;
    const phoneRegex = /^01[0125][0-9]{8}$/; // مصري
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/; // على الأقل 6 أحرف

    if (!nameRegex.test(name)) {
      showAlert(
        "Please enter a valid full name (letters and spaces only, min 3 characters)."
      );
      return false;
    }
    if (!phoneRegex.test(phone)) {
      showAlert(
        "Please enter a valid Egyptian phone number (ex: 01012345678)."
      );
      return false;
    }
    if (!emailRegex.test(email)) {
      showAlert("Please enter a valid email address.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      showAlert("Password must be at least 6 characters.");
      return false;
    }
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (validateInputs(name, phone, email, password)) {
      const userData = { name, phone, email, password };
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "cart.html";
    }
  });
});
