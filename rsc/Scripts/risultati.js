const rateUS = document.getElementById("rate");

const btn = document.getElementsByClassName("txtBtn");

rateUS.addEventListener("click", function () {
  window.location.href = "feedback.html";
});

rateUS.addEventListener("mouseover", function () {
  rateUS.style.cssText = `
    background-color: #00ffff;
    padding: 15px 30px;
    font-size: 1.2rem;
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  `;
});

rateUS.addEventListener("mouseout", function () {
  rateUS.style.cssText = `
    background-color: grey;
    padding: 15px 30px;
    font-size: 1.2rem;
    box-shadow: 0 0 15px grey;
    color:white;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bolder;
    font-size: 30px;
  `;
});

document.addEventListener("DOMContentLoaded", () => {
  // recupero i dati
  const results = JSON.parse(localStorage.getItem("quizResults"));

  if (results) {
    // aggiorno il DOM
    document.querySelector(".div1 .wrong1").textContent =
      results.percentCorrect + "%";
    document.querySelector(
      ".div1 .wrong2"
    ).textContent = `${results.correct}/${results.total} questions`;

    document.querySelector(".div3 .wrong1").textContent =
      results.percentWrong + "%";
    document.querySelector(
      ".div3 .wrong2"
    ).textContent = `${results.wrong}/${results.total} questions`;

    // messaggio centrale
    const message = document.querySelector(".div2 .p1");
    if (results.percentCorrect >= 60) {
      message.innerHTML = `Congratulations!<br><span class="highlight">You passed the exam.</span>`;
    } else {
      message.innerHTML = `Oops!<br><span class="highlight">You did not pass.</span>`;
    }
  }
});
