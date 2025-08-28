const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

const shuffleQuestions = function () {
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = questions[i];
    questions[i] = questions[j];
    questions[j] = k;
  }
};

const question = document.getElementById("domanda");
const answer = document.getElementById("contenitoreRisposte");

//inizializziazione variabili
let timer;
let score = 0;
let rispostaUtente;
let indexCurrent = 0;
let c = 1;

console.log(questions.length);

//funzione che aggiorna contatore
function goNextQuestion() {
  indexCurrent++;
  c++;
  contatore.innerHTML = `QUESTION ${c} /10`;

  if (indexCurrent < questions.length) {
    showQuestion(indexCurrent);
  } else {
    window.location.href = "paginaRisultati.html";
  }
}

//---------------------------funzione PRINCIPALE---------------------------------
const showQuestion = function (index) {
  //prendiamo i singoli oggetti dell`array
  const domande = questions[index];
  document.getElementById("domanda").innerHTML = domande.question;

  //creiamo un array vuoto che riempiamo conn tutte le answer
  let answers = [];
  answers.push(domande.correct_answer);
  console.log(answers);
  domande.incorrect_answers.forEach((incorretto) => answers.push(incorretto));
  console.log(answers);
  // randomizzazione posizione risposte
  answers.sort(() => Math.random() - 0.5);

  //prendiamo le risposte e le mettiamo nelle label
  for (let i = 0; i < 4; i++) {
    let label = document.getElementById("risposta" + (i + 1));
    if (i < answers.length) {
      //ripristiniamo il numero di label
      label.style.display = "inline-block";
      label.innerHTML = `<input type="radio" name="answer" value= "${answers[i]}"/> ${answers[i]} `;
    } else {
      //se le risposte sono due nascondiamo le due label in più.
      label.style.display = "none";
    }
  }

  ///creiamo la costante radios presa dall inner html precedente e gli assegna un evento click
  const radios = document.querySelectorAll('input[name="answer"]');
  radios.forEach((radio) => {
    radio.onclick = () => {
      // resetta background di tutte le label
      radios.forEach((r) => (r.parentElement.style.backgroundColor = ""));

      // assegna la risposta selezionata
      rispostaUtente = radio.value;
      console.log("Risposta selezionata:", rispostaUtente);

      // evidenzia la label cliccata
      radio.parentElement.style.backgroundColor = "#900080";
    };
  });

  // creiamo un timer che faccia in modo che allo scadere una risposta non data venga considerata sbagliata
  // allo scadere del timer viene eseguito quello che contiene
  timer = setTimeout(() => {
    if (rispostaUtente === undefined) {
      console.log("risposta errata");
    } else {
      //se invece la risposta viene data verifichiamo che sia corretta e se lo è aggiorniamo lo score
      if (rispostaUtente === domande.correct_answer) {
        score++;
        console.log("Punteggio aggiornato:", score);
      }
    }

    // qui viene resettata la risposta utente
    rispostaUtente = undefined;

    //aggiorniamo il contatore
    indexCurrent++;
    c++;
    contatore.innerHTML = `QUESTION ${c}/10`;

    if (indexCurrent < questions.length) {
      showQuestion(indexCurrent);
    } else {
      //local storage
      localStorage.setItem("lunghezzaTest", questions.length);
      localStorage.setItem("score", score);
      window.location.href = "paginaRisultati.html";
    }
  }, 15000); // 15 secondi
};
//--------------------------- FINE funzione PRINCIPALE ---------------------------------

// mostra la prima domanda quando la pagina è pronta
window.onload = function () {
  shuffleQuestions();
  showQuestion(0);
};

//prendiamo il bottone e l`h4 contenente la risposta dall`html
const nextBtn = document.querySelector("button");
const contatore = document.querySelector("h4");

// --------------------------- funzione NEXTBTN --------------------------------------------
nextBtn.addEventListener("click", function () {
  // cancella il timer per evitare doppio incremento
  clearTimeout(timer);
  nextBtn.disabled = true;

  // valutiamo subito la risposta utente
  if (rispostaUtente !== undefined) {
    if (rispostaUtente === questions[indexCurrent].correct_answer) {
      score++;
      console.log("Punteggio aggiornato:", score);
    }
  } else {
    console.log("Nessuna risposta selezionata: considerata sbagliata");
  }

  // reset selezione
  rispostaUtente = undefined;

  // evidenzia soluzioni
  const radios = document.querySelectorAll('input[name="answer"]');
  radios.forEach((r) => {
    if (r.value === questions[indexCurrent].correct_answer) {
      r.parentElement.style.border = "solid 2px green";
    } else {
      r.parentElement.style.border = "solid 2px red";
    }
  });

  setTimeout(() => {
    // reset selezione
    rispostaUtente = undefined;
    //reset background
    const radios = document.querySelectorAll('input[name="answer"]');
    radios.forEach((r) => (r.parentElement.style.border = ""));
    radios.forEach((r) => (r.parentElement.style.backgroundColor = ""));
    // aggiorno contatore
    indexCurrent++;
    c++;
    contatore.innerHTML = `QUESTION ${c}/10`;

    if (indexCurrent < questions.length) {
      showQuestion(indexCurrent);
    } else {
      //local storage
      localStorage.setItem("lunghezzaTest", questions.length);
      localStorage.setItem("score", score);
      window.location.href = "paginaRisultati.html";
    }
    nextBtn.disabled = false;
  }, 1000);
});
