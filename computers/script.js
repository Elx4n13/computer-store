let users = JSON.parse(localStorage.getItem("USERS"));
let user = JSON.parse(localStorage.getItem("USER"));
let computers = [];
let cards = document.querySelector(".right");

// Populate the computers array and display initial cards
users.forEach((element) => {
  element.computers.forEach((computer) => {
    computers.push(computer);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setupModalControls();
  setDefaultFilter("Acer"); // Set "Acer" as the default filter on page load
});
document.querySelector(".searchInp").addEventListener("input", filterBySearch);
document.querySelectorAll(".list-group li").forEach((el) => {
  el.addEventListener("click", (cl) =>
    filterByCategory(el, cl.target.innerHTML)
  );
});

// Set default filter on page load
function setDefaultFilter(defaultCategory) {
  // Find the category element in the menu and mark it as active
  const categoryElements = document.querySelectorAll(".list-group li");
  categoryElements.forEach((el) => {
    if (el.innerHTML.trim() === defaultCategory) {
      el.classList.add("activee");
    } else {
      el.classList.remove("activee");
    }
  });

  // Filter the computers by the default category and render them
  const filteredComputers = computers.filter((comp) =>
    comp.categoriya.toLowerCase().includes(defaultCategory.toLowerCase())
  );
  renderCards(filteredComputers);
}

// Generate card HTML
function generateCardHTML(computer, index) {
  return `
    <div class="card" style="width: 18rem;">
      <img src="${computer.shekl}" class="card-img-top" alt="...">
      <div class="card-body">
        <p>Ad: <span class="ad">${computer.ad}</span></p>
        <p>tesvir: <span class="tesvir">${computer.tesvir}</span></p>
        <p>qiymet: <span class="qiymet">${computer.qiymet}</span></p>
        <p>yeni: <span class="yeni">${computer.yeni}</span></p>
        <small>telefon: <span class="telefon">Acer 1</span></small>
        <button onclick="etrafli(${index})" class="btn btn-primary">Etrafli</button>
      </div>
    </div>`;
}

// Display modal with detailed information
function etrafli(index) {
  const comp = computers[index];
  const modal = document.getElementById("exampleModal");
  const modalBody = document.querySelector(".modal-body");

  modalBody.innerHTML = generateModalContent(comp);
  showModal(modal);
}

// Generate modal content HTML
function generateModalContent(comp) {
  return `
    <div class="header">
      <h1>Komputer haqqinda melumat</h1>
      <img src="${comp.shekl}" alt="">
    </div>
    <div class="footer">
      <p>ad: ${comp.ad}</p>
      <p>tesvir: ${comp.tesvir}</p>
      <p>qiymet: ${comp.qiymet}</p>
      <p>telefon: ${user.tel}</p>
      <p>yeni: ${comp.yeni}</p>
      <p>Emeli yaddas: ${comp.yaddas}</p>
      <p>CPU: ${comp.prosessor}</p>
      <p>Daimi yaddas: ${comp.dmyaddas}</p>
      <p>Daimi yaddas tipi: ${comp.dmtipi}</p>
      <p>Emeliyat sistemi: ${comp.osystem}</p>
      <p>Video kart: ${comp.videoKart}</p>
    </div>`;
}

// Filter cards by category
function filterByCategory(el, category) {
  document
    .querySelectorAll(".list-group li")
    .forEach((item) => item.classList.remove("activee"));
  el.classList.add("activee");

  const filteredComputers = computers.filter((comp) =>
    comp.categoriya.toLowerCase().includes(category.toLowerCase())
  );
  renderCards(filteredComputers);
}

// Filter cards by search input
function filterBySearch() {
  const searchQuery = document.querySelector(".searchInp").value.toLowerCase();
  const filteredComputers = computers.filter(
    (computer) =>
      computer.ad.toLowerCase().includes(searchQuery) ||
      computer.categoriya.toLowerCase().includes(searchQuery) ||
      computer.qiymet.toLowerCase().includes(searchQuery)
  );
  renderCards(filteredComputers);
}

// Render filtered cards
function renderCards(computers) {
  cards.innerHTML = `<div class="spinner-border m-auto" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`;
  setTimeout(() => {
    cards.innerHTML = "";
    if (computers.length) {
      computers.forEach((computer) => {
        cards.innerHTML += generateCardHTML(
          computer,
          computers.indexOf(computer)
        );
      });
    } else {
      cards.innerHTML = "Komputer tapilmadi";
    }
  }, 500);
}

// Modal setup and controls
function setupModalControls() {
  const closeModalButtons = document.querySelectorAll(".close, #closeBtn");
  closeModalButtons.forEach((button) =>
    button.addEventListener("click", hideModal)
  );
}

// Show modal
function showModal(modal) {
  modal.classList.add("show");
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-hidden", "false");
}

// Hide modal
function hideModal() {
  const modal = document.getElementById("exampleModal");
  modal.classList.remove("show");
  modal.style.display = "none";
  modal.setAttribute("aria-modal", "false");
  modal.setAttribute("aria-hidden", "true");
}
