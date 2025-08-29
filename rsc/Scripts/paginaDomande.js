const questionsEasy = [
  {
    type: "boolean",
    difficulty: "medium",
    category: "Science: Computers",
    question: "The HTML5 standard was published in 2014.",
    correct_answer: "True",
    incorrect_answers: ["False"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "What five letter word is the motto of the IBM Computer company?",
    correct_answer: "Think",
    incorrect_answers: ["Click", "Logic", "Pixel"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "In programming, the ternary operator is mostly defined with what symbol(s)?",
    correct_answer: "?:",
    incorrect_answers: ["??", "if then", "?"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Which of these people was NOT a founder of Apple Inc?",
    correct_answer: "Jonathan Ive",
    incorrect_answers: ["Steve Jobs", "Ronald Wayne", "Steve Wozniak"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "What is known as &quot;the brain&quot; of the Computer?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Motherboard", "Graphics Processing Unit", "Keyboard"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "What was the first Android version specifically optimized for tablets?",
    correct_answer: "Honeycomb",
    incorrect_answers: ["Eclair", "Froyo", "Marshmellow"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "In CSS, which of these values CANNOT be used with the &quot;position&quot; property?",
    correct_answer: "center",
    incorrect_answers: ["static", "absolute", "relative"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question:
      "Which coding language was the #1 programming language in terms of usage on GitHub in 2015?",
    correct_answer: "JavaScript",
    incorrect_answers: ["C#", "Python", "PHP"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Approximately how many Apple I personal computers were created?",
    correct_answer: "200",
    incorrect_answers: ["100", "500", "1000"],
  },
  {
    type: "multiple",
    difficulty: "medium",
    category: "Science: Computers",
    question: "Which operating system was released first?",
    correct_answer: "Mac OS",
    incorrect_answers: ["Windows", "Linux", "OS/2"],
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
      if (indexCurrent < questionsEasy.length) {
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questionsEasy.length
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
  for (let i = questionsEasy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = questionsEasy[i];
    questionsEasy[i] = questionsEasy[j];
    questionsEasy[j] = k;
  }
};

/*
    FUNZIONI PRINCIPALI
*/

const showQuestion = function (index) {
  const domande = questionsEasy[index];
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
      if (r.value === questionsEasy[indexCurrent].correct_answer) {
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

      if (indexCurrent < questionsEasy.length - 1) {
        indexCurrent++;
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questionsEasy.length
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
  const total = questionsEasy.length;
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
