const questionMedium = [
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "HTML is what type of language?",
    correct_answer: "Markup Language",
    incorrect_answers: [
      "Macro Language",
      "Programming Language",
      "Scripting Language",
    ],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
    correct_answer: "Apple",
    incorrect_answers: ["Microsoft", "Atari", "Commodore"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "When Gmail first launched, how much storage did it provide for your email?",
    correct_answer: "1GB",
    incorrect_answers: ["512MB", "5GB", "Unlimited"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What language does Node.js use?",
    correct_answer: "JavaScript",
    incorrect_answers: ["Java", "Java Source", "Joomla Source Code"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "In &quot;Hexadecimal&quot;, what color would be displayed from the color code? &quot;#00FF00&quot;?",
    correct_answer: "Green",
    incorrect_answers: ["Red", "Blue", "Yellow"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The NVidia GTX 1080 gets its name because it can only render at a 1920x1080 screen resolution.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
    correct_answer: "1000",
    incorrect_answers: ["512", "1024", "500"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "What is the domain name for the country Tuvalu?",
    correct_answer: ".tv",
    incorrect_answers: [".tu", ".tt", ".tl"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "How many values can a single byte represent?",
    correct_answer: "256",
    incorrect_answers: ["8", "1", "1024"],
  },
];

/*
   VARIABILI GLOBALI
*/

let indexCurrent = 0;
let timerInterval;
let score = 0;
let wrong = 0;

/*
   ELEMENTI DEL DOM
*/

const question = document.getElementById("domanda");
const answer = document.getElementById("contenitoreRisposte");
const timer = document.getElementById("seconds");
const contatore = document.querySelector("h4");

/*
   USANDO SETTIMEOUT() MODIFICO IL TIMER NEL DOM
*/

const timerCounter = function () {
  let passing = 60;
  timer.innerHTML = passing;

  function gong() {
    timer.innerHTML = passing;
    passing--;

    if (passing >= 0) {
      timerInterval = setTimeout(gong, 1000);
    } else {
      indexCurrent++;
      if (indexCurrent < questionMedium.length) {
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questionMedium.length
        }`;
        showQuestion(indexCurrent);
      } else {
        showFinalScore();
      }
    }
  }

  setTimeout(gong, 1000);
};

/*
   RANDOMIZZO LE DOMANDE PROPOSTE
*/

const shuffleQuestions = function () {
  for (let i = questionMedium.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = questionMedium[i];
    questionMedium[i] = questionMedium[j];
    questionMedium[j] = k;
  }
};

/*
    FUNZIONI PRINCIPALI
*/

const showQuestion = function (index) {
  const domande = questionMedium[index];
  document.getElementById("domanda").innerHTML = domande.question;

  let answers = [];
  answers.push(domande.correct_answer);
  domande.incorrect_answers.forEach((incorretto) => answers.push(incorretto));

  // RANDOMIZZO RISPOSTE
  answers.sort(() => Math.random() - 0.5);

  let numAnswers = domande.type === "multiple" ? 4 : 2;

  const labels = document.querySelectorAll(".risposta");

  /*
    RESET DELLE LABELS
*/
  labels.forEach((label, i) => {
    if (i < numAnswers) {
      label.style.display = "inline-block";
      label.innerHTML = `<input type="radio" name="answer" value= "${answers[i]}"/> ${answers[i]} `;
      label.style.cssText = "";
    } else {
      label.style.display = "none";
    }
  });

  // 🔹 flag per contare solo una volta
  let answered = false;

  const inputClick = document.querySelectorAll("input[type=radio]");
  inputClick.forEach((input) => {
    input.addEventListener("click", function () {
      // reset colore
      labels.forEach((label, i) => {
        if (i < numAnswers) label.style.cssText = "";
      });

      // evidenzio quello cliccato
      const label = input.parentElement;
      label.style.cssText = `background-color: #6d0957ff;`;
      document.getElementById("nextBtn").disabled = false;

      // punteggio solo la prima volta
      if (!answered) {
        const rispostaScelta = label.textContent.trim();
        if (rispostaScelta === domande.correct_answer) {
          score++;
        } else {
          wrong++;
        }
        answered = true; // blocca incrementi multipli
        console.log(`Correct: ${score}, Wrong: ${wrong}`);
      }
    });
  });

  document.getElementById("nextBtn").disabled = true;

  clearTimeout(timerInterval);
  timerCounter();
};

/*
    AVVIO RANDOMIZZAZIONE E FUNZIONI PRINCIPALI
*/

shuffleQuestions();
showQuestion(0);

/*
   FUNZIONE PER PASSARE ALLA DOMANDA SUCCESSIVA CON BOTTONE 'NEXT'
*/
function nextQuestion() {
  const nextBtn = document.querySelector("button");

  nextBtn.addEventListener("click", function () {
    nextBtn.disabled = true;

    const radios = document.querySelectorAll('input[name="answer"]');
    radios.forEach((r) => {
      if (r.value === questionMedium[indexCurrent].correct_answer) {
        r.parentElement.style.border = "solid 2px green";
      } else {
        r.parentElement.style.border = "solid 2px red";
      }
    });

    setTimeout(() => {
      // reset selezione

      //reset background
      const radios = document.querySelectorAll('input[name="answer"]');
      radios.forEach((r) => (r.parentElement.style.border = ""));
      radios.forEach((r) => (r.parentElement.style.backgroundColor = ""));

      if (indexCurrent < questionMedium.length - 1) {
        indexCurrent++;
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questionMedium.length
        }`;
        showQuestion(indexCurrent);
      } else {
        showFinalScore();
      }
      nextBtn.disabled = false;
    }, 800);
  });
}

/*
   AVVIO NEXT()
*/

nextQuestion();

/* 
   FUZIONE PER REGISTRARE IL RISULTATO DELLO SCORE,
   REGISTRARLO IN LOCAL.STORAGE, PER POI POTER UTILIZZARE IL SUO
   VALORE NELLA PAGINA JS SUCCESSIVA
*/

function showFinalScore() {
  const total = questionMedium.length;
  const correct = score;
  const percentCorrect = ((correct / total) * 100).toFixed(1);
  const percentWrong = ((wrong / total) * 100).toFixed(1);

  localStorage.setItem(
    "quizResults",
    JSON.stringify({
      total,
      correct,
      wrong,
      percentCorrect,
      percentWrong,
    })
  );

  window.location.href = "paginaRisultati.html";
}
