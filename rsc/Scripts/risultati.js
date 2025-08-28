const finalScore = Number(localStorage.getItem("score"));
console.log("punteggio a fine test", finalScore);
const totaleDomande = Number(localStorage.getItem("lunghezzaTest"));
console.log("numero domande del test", totaleDomande);
document.getElementsByClassName("wrong2")[0].textContent = ` ${finalScore} / ${totaleDomande} QUESTIONS`;

const percentualeCorrette = (finalScore / totaleDomande) * 100;
document.getElementsByClassName("wrong1")[0].textContent = `${percentualeCorrette}%`;

const finalNegativeScore = totaleDomande - finalScore;
document.getElementsByClassName("wrong2")[1].textContent = ` ${finalNegativeScore} / ${totaleDomande} QUESTIONS`;

const percentualeSbagliate = (finalNegativeScore / totaleDomande) * 100;

document.getElementsByClassName("wrong1")[1].textContent = `${percentualeSbagliate}%`;
