document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle();
  setupValidationListeners();
  checkIfLoggedIn();
});

const signInForm = document.querySelector("#myForm");
const passwordInput = document.querySelector("#validationServerPassword");
const usernameInput = document.querySelector("#validationServer01");

// Function to toggle password visibility
function setupPasswordToggle() {
  const togglePasswordButton = document.getElementById("togglePassword");

  togglePasswordButton.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");

    // Toggle eye icon
    togglePasswordButton.innerHTML = isPassword
      ? '<i class="fa-solid fa-eye-slash"></i>'
      : '<i class="fa-solid fa-eye"></i>';
  });
}

// Setup validation listeners
function setupValidationListeners() {
  const checkPass = document.querySelector(".check-pass");
  const checkUsername = document.querySelector(".check-username");

  passwordInput.addEventListener("input", () =>
    validateField(passwordInput, checkPass, "Parol yaz")
  );
  usernameInput.addEventListener("input", () =>
    validateField(usernameInput, checkUsername, "İstifadəçi adı yazın")
  );
}

// General field validation function
function validateField(input, checkElement, emptyMessage) {
  if (input.value.length) {
    checkElement.innerHTML = "Dogrudur";
    checkElement.style.color = "green";
  } else {
    checkElement.innerHTML = emptyMessage;
    checkElement.style.color = "red";
  }
}

// Retrieve users from local storage
function getLocalUsers() {
  return JSON.parse(localStorage.getItem("USERS")) || [];
}

// Check if a user is already logged in and redirect
function checkIfLoggedIn() {
  const currentUser = JSON.parse(localStorage.getItem("USER"));
  if (currentUser) {
    const users = getLocalUsers();
    const loggedUser = users.find(
      (user) =>
        user.username === currentUser.username &&
        user.password === currentUser.password
    );
    if (loggedUser) location.href = "../index.html";
  }
}

// Form submission handler
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const enteredUsername = usernameInput.value;
  const enteredPassword = passwordInput.value;
  const users = getLocalUsers();

  const user = users.find(
    (user) =>
      user.username === enteredUsername && user.password === enteredPassword
  );

  if (user) {
    localStorage.setItem(
      "USER",
      JSON.stringify({
        username: user.username,
        password: user.password,
        tel: user.tel,
      })
    );
    location.href = "../index.html";
  } else {
    alert("Şifrə və ya istifadəçi adı yanlışdır.");
  }
});
