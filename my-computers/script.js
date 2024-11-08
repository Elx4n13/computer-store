document.addEventListener("DOMContentLoaded", function () {
  setupModalToggles();
  setupDataTable();
  checkUser();
});

const users = JSON.parse(localStorage.getItem("USERS")) || [];
const user = JSON.parse(localStorage.getItem("USER")) || {};
let computers = [];

// Setup Modal Toggles
function setupModalToggles() {
  const showModalBtn = document.getElementById("showModalBtn");
  const closeModalBtn = document.getElementById("closeBtn");
  const saveBtn = document.getElementById("submit");
  const modal = document.getElementById("exampleModal");

  showModalBtn.addEventListener("click", () => toggleModal(modal, true));
  closeModalBtn.addEventListener("click", () => toggleModal(modal, false));
  saveBtn.addEventListener("submit", saveComputer);
}

// Toggle modal visibility
function toggleModal(modal, show) {
  modal.classList.toggle("show", show);
  modal.style.display = show ? "block" : "none";
  modal.setAttribute("aria-modal", show.toString());
  modal.setAttribute("aria-hidden", (!show).toString());
}

// Setup DataTable
function setupDataTable() {
  $("#myTable").DataTable();
}

// Check if user is authenticated
function checkUser() {
  let isAuthenticated = users.some((item) => {
    if (item.username === user.username && item.password === user.password) {
      computers = item.computers;
      showComputersTable(computers);
      return true;
    }
    return false;
  });
  if (!isAuthenticated) location.href = "../sign-in/sign-in.html";
}

// Generate unique computer ID
function generateComputerId() {
  return computers.length
    ? Math.max(...computers.map((comp) => comp.id)) + 1
    : 1;
}

// Update user with computers and save to localStorage
function setComputerUser() {
  users.forEach((item) => {
    if (item.username === user.username && item.password === user.password) {
      item.computers = computers;
      localStorage.setItem("USERS", JSON.stringify(users));
      showComputersTable(computers);
    }
  });
}

// Display computers in the table
function showComputersTable(computers) {
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  computers.forEach((item) => {
    const trTable = document.createElement("tr");
    trTable.innerHTML = `
      <td>${item.id}</td>
      <td>${item.ad}</td>
      <td class='imageComp'><img src='${item.shekl}'></img></td>
      <td>${item.qiymet}</td>
      <td>
        <button class='edit' onclick='editComputer(${item.id})'>Redakte</button>
        <button class='delete' onclick='deleteComputer(${item.id})'>Sil</button>
      </td>`;
    tableBody.prepend(trTable);
  });
}

// Save new computer
function saveComputer(event) {
  event.preventDefault();
  const computer = gatherComputerData();
  computers.push(computer);
  computers.sort((a, b) => a.id - b.id);
  setComputerUser();
  toggleModal(document.getElementById("exampleModal"), false);
}

// Gather data for new or edited computer
function gatherComputerData(edit = false) {
  return {
    id: edit ? editComputerInfo.id : generateComputerId(),
    user: user.username,
    tel: user.tel,
    categoriya: document.querySelector(
      edit ? "#validationServer04Edit" : "#validationServer04"
    ).value,
    ad: document.querySelector(edit ? ".adEdit" : ".ad").value,
    qiymet: document.querySelector(edit ? ".qiymetEdit" : ".qiymet").value,
    tesvir: document.querySelector(edit ? ".tesvirEdit" : ".tesvir").value,
    yeni: document.querySelector(edit ? ".yeniEdit" : ".yeni").value,
    shekl: document.querySelector(edit ? ".shekilEdit" : ".shekil").value,
    yaddas: document.querySelector(edit ? ".yaddasEdit" : ".yaddas").value,
    prosessor: document.querySelector(edit ? ".prosessorEdit" : ".prosessor")
      .value,
    dmyaddas: document.querySelector(edit ? ".dmyaddasEdit" : ".dmyaddas")
      .value,
    dmtipi: document.querySelector(edit ? ".dmtipiEdit" : ".dmtipi").value,
    osystem: document.querySelector(edit ? ".osystemEdit" : ".osystem").value,
    videoKart: document.querySelector(edit ? ".videoKartEdit" : ".videoKart")
      .value,
  };
}

// Delete computer
function deleteComputer(id) {
  computers = computers.filter((item) => item.id !== id);
  setComputerUser();
}

// Edit computer
let editComputerInfo = {};
function editComputer(id) {
  const editModal = document.getElementById("editModal");
  toggleModal(editModal, true);

  editComputerInfo = computers.find((item) => item.id === id);
  populateEditForm(editComputerInfo);

  const closeEditModalBtn = document.getElementById("closeEdit");
  closeEditModalBtn.addEventListener("click", () =>
    toggleModal(editModal, false)
  );
}

// Populate edit form with computer data
function populateEditForm(data) {
  document.querySelector("#validationServer04Edit").value = data.categoriya;
  document.querySelector(".adEdit").value = data.ad;
  document.querySelector(".qiymetEdit").value = data.qiymet;
  document.querySelector(".tesvirEdit").value = data.tesvir;
  document.querySelector(".yeniEdit").value = data.yeni;
  document.querySelector(".shekilEdit").value = data.shekl;
  document.querySelector(".yaddasEdit").value = data.yaddas;
  document.querySelector(".prosessorEdit").value = data.prosessor;
  document.querySelector(".dmyaddasEdit").value = data.dmyaddas;
  document.querySelector(".dmtipiEdit").value = data.dmtipi;
  document.querySelector(".osystemEdit").value = data.osystem;
  document.querySelector(".videoKartEdit").value = data.videoKart;
}

// Save edited computer
const formEdit = document.getElementById("submitEdit");
formEdit.addEventListener("click", function (e) {
  e.preventDefault();
  const editedComputer = gatherComputerData(true);

  computers = computers.filter((item) => item.id !== editedComputer.id);
  computers.push(editedComputer);
  setComputerUser();

  toggleModal(document.getElementById("editModal"), false);
});
