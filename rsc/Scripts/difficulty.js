// VARIABILI GLOBALI

let timeOut;

// ELEMENTI DOM

const btnEasy = document.getElementById("easy");
const btnMedium = document.getElementById("medium");
const btnHard = document.getElementById("hard");
const goodLuck = document.createElement("h2");

// --------- EASY ----------------

btnEasy.addEventListener("click", () => {
  btnEasy.classList.add("buttonClicked");
  goodLuck.classList.add("salute");
  goodLuck.innerHTML = "Good luck with your exam!";
  document.body.appendChild(goodLuck);

  timeOut = setTimeout(() => {
    window.location.href = "paginaDomande.html";
  }, 3000);
});

btnEasy.addEventListener("mouseover", function () {
  btnEasy.classList.add("buttonClicked");
});

btnEasy.addEventListener("mouseout", function () {
  btnEasy.classList.remove("buttonClicked");
});

// --------- MEDIUM ----------------

btnMedium.addEventListener("click", () => {
  btnMedium.classList.add("buttonClicked");
  goodLuck.classList.add("salute");
  goodLuck.innerHTML = "Good luck with your exam!";
  document.body.appendChild(goodLuck);

  timeOut = setTimeout(() => {
    window.location.href = "paginaDomandeMedium.html";
  }, 3000);
});

btnMedium.addEventListener("mouseover", function () {
  btnMedium.classList.add("buttonClicked");
});

btnMedium.addEventListener("mouseout", function () {
  btnMedium.classList.remove("buttonClicked");
});

// --------- HARD --------------

btnHard.addEventListener("click", () => {
  btnHard.classList.add("buttonClicked");
  goodLuck.classList.add("salute");
  goodLuck.innerHTML = "Good luck with your exam!";
  document.body.appendChild(goodLuck);

  timeOut = setTimeout(() => {
    window.location.href = "paginaDomandeHard.html";
  }, 3000);
});

btnHard.addEventListener("mouseover", function () {
  btnHard.classList.add("buttonClicked");
});

btnHard.addEventListener("mouseout", function () {
  btnHard.classList.remove("buttonClicked");
});
