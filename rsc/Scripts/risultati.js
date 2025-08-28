window.onload = function () {
  // riprendiamo lo score dalla pagina del benchmark
  const finalScore = Number(localStorage.getItem("score"));
  console.log("punteggio a fine test", finalScore);
  // riprendiamo il totale delle domande dalla pagina del benchmark
  const totaleDomande = Number(localStorage.getItem("lunghezzaTest"));
  console.log("numero domande del test", totaleDomande);

  // aggiorniamo i paragrafi del risultato positivo
  document.getElementsByClassName("wrong2")[0].textContent = ` ${finalScore} / ${totaleDomande} QUESTIONS`;
  const percentualeCorrette = (finalScore / totaleDomande) * 100;
  document.getElementsByClassName("wrong1")[0].textContent = `${percentualeCorrette}%`;

  // stessa cosa per i negativi
  const finalNegativeScore = totaleDomande - finalScore;
  document.getElementsByClassName("wrong2")[1].textContent = ` ${finalNegativeScore} / ${totaleDomande} QUESTIONS`;
  const percentualeSbagliate = (finalNegativeScore / totaleDomande) * 100;
  document.getElementsByClassName("wrong1")[1].textContent = `${percentualeSbagliate}%`;

  // creiamo una funzione che dia l`esito del test all`utente in base allo score
  const promossoBocciato = function () {
    const p1 = document.getElementsByClassName("p1");
    const p2 = document.getElementsByClassName("p2");

    if (percentualeCorrette >= 60) {
      p1[0].textContent = "congratulations!";
    } else {
      p1[0].textContent = "We are sorry...";
      p2[0].textContent = "Don`t give up! Study a bit more and try the test again on a lower difficulty.";
    }
  };
  promossoBocciato();
};

const goToFeedbackBtn = document.getElementsByClassName("txtBtn");

goToFeedbackBtn[0].addEventListener("click", function () {
  window.location.href = "feedback.html";
});
