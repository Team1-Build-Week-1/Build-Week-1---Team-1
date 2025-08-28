const questions = [
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "RAM stands for Random Access Memory.",
    correct_answer: "True",
    incorrect_answers: ["False"],
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
      "The C programming language was created by this American computer scientist. ",
    correct_answer: "Dennis Ritchie",
    incorrect_answers: ["Tim Berners Lee", "al-Khwārizmī", "Willis Ware"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "This mobile OS held the largest market share in 2012.",
    correct_answer: "iOS",
    incorrect_answers: ["Android", "BlackBerry", "Symbian"],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
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
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question: "Ada Lovelace is often considered the first computer programmer.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "easy",
    category: "Science: Computers",
    question: "In computing, what does LAN stand for?",
    correct_answer: "Local Area Network",
    incorrect_answers: [
      "Long Antenna Node",
      "Light Access Node",
      "Land Address Navigation",
    ],
  },
  {
    type: "boolean",
    difficulty: "easy",
    category: "Science: Computers",
    question:
      "The Python programming language gets its name from the British comedy group &quot;Monty Python.&quot;",
    correct_answer: "True",
    incorrect_answers: ["False"],
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
      if (indexCurrent < questions.length) {
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questions.length
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
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = questions[i];
    questions[i] = questions[j];
    questions[j] = k;
  }
};

/*
    FUNZIONI PRINCIPALI
*/

const showQuestion = function (index) {
  const domande = questions[index];
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
      label.innerHTML = `<input type="radio" name="answer" /> ${answers[i]}`;
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
      label.style.cssText = `background-color: #00BFFF;`;
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
    if (indexCurrent < questions.length - 1) {
      indexCurrent++;
      contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
        questions.length
      }`;
      showQuestion(indexCurrent);
    } else {
      showFinalScore();
    }
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
  const total = questions.length;
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
