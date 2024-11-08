document.addEventListener("DOMContentLoaded", () => {
  setupPasswordToggle();
  setupValidationListeners();
  checkIfLoggedIn();
});

const form = document.querySelector("form");
let users = [];

// User Class Definition
class User {
  constructor(ad, tel, username, password) {
    this.id = this.generateId();
    this.ad = ad;
    this.tel = tel;
    this.username = username;
    this.password = password;
    this.computers = [];
  }

  generateId() {
    return users.length ? users[users.length - 1].id + 1 : 1;
  }

  static setLocal() {
    localStorage.setItem("USERS", JSON.stringify(users));
  }

  static getLocal() {
    users = JSON.parse(localStorage.getItem("USERS")) || [];
  }
}

// Setup password toggle functionality
function setupPasswordToggle() {
  const togglePasswordButton = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("validationServerPassword");

  togglePasswordButton.addEventListener("click", () => {
    const isPassword = passwordInput.getAttribute("type") === "password";
    passwordInput.setAttribute("type", isPassword ? "text" : "password");

    // Toggle eye icon
    togglePasswordButton.innerHTML = isPassword
      ? '<i class="fa-solid fa-eye-slash"></i>'
      : '<i class="fa-solid fa-eye"></i>';
  });
}

// Setup input validation listeners
function setupValidationListeners() {
  const ad = document.querySelector(".ad");
  const tel = document.querySelector(".tel");
  const username = document.querySelector(".username");
  const password = document.querySelector(".password");

  ad.addEventListener("input", () =>
    validateField(ad, "check-ad", "Adinizi yazin")
  );
  tel.addEventListener("input", () => validatePhoneNumber(tel));
  username.addEventListener("input", () =>
    validateField(username, "check-username", "Istifadeci Adinizi yazin")
  );
  password.addEventListener("input", () =>
    validateField(password, "check-pass", "Parolunuzu yazin")
  );
}

// General field validation
function validateField(input, checkClass, emptyMessage) {
  const checkElement = document.querySelector(`.${checkClass}`);
  if (input.value.length) {
    checkElement.innerHTML = "Dogrudur";
    checkElement.style.color = "green";
  } else {
    checkElement.innerHTML = emptyMessage;
    checkElement.style.color = "red";
  }
}

// Phone number validation
function validatePhoneNumber(tel) {
  const checkTel = document.querySelector(".check-tel");
  const pattern = /^\d{3}-\d{3}-\d{4}$/;

  if (pattern.test(tel.value)) {
    checkTel.innerHTML = "Dogrudur";
    checkTel.style.color = "green";
  } else {
    checkTel.innerHTML = "Nomrenizi yazin";
    checkTel.style.color = "red";
  }
}

// Check if the user is already logged in
function checkIfLoggedIn() {
  const user = JSON.parse(localStorage.getItem("USER"));
  if (user) {
    User.getLocal();
    const loggedUser = users.find(
      (u) => u.username === user.username && u.password === user.password
    );
    if (loggedUser) location.href = "../index.html";
  }
}

// Form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ad = document.querySelector(".ad").value;
  const tel = document.querySelector(".tel").value;
  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;

  User.getLocal();
  if (!isUsernameTaken(username)) {
    const newUser = new User(ad, tel, username, password);
    users.push(newUser);
    User.setLocal();
    location.href = "../sign-in/sign-in.html";
  } else {
    alert("Bu istifadəçi artıq mövcuddur.");
  }
});

// Check if a username is already taken
function isUsernameTaken(username) {
  return users.some((user) => user.username === username);
}

// Redirect if user is not logged in
window.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("USER"));
  if (user) {
    User.getLocal();
    if (
      !users.some(
        (u) => u.username === user.username && u.password === user.password
      )
    ) {
      location.href = "/index.html";
    }
  }
});
