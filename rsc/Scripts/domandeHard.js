const questionHard = [
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "America Online (AOL) started out as which of these online service providers?",
    correct_answer: "Quantum Link",
    incorrect_answers: ["CompuServe", "Prodigy", "GEnie"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "Which of the following computer components can be built using only NAND gates?",
    correct_answer: "ALU",
    incorrect_answers: ["CPU", "RAM", "Register"],
  },
  {
    type: "boolean",
    difficulty: "hard",
    category: "Science: Computers",
    question: "DHCP stands for Dynamic Host Configuration Port.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "What was the name of the security vulnerability found in Bash in 2014?",
    correct_answer: "Shellshock",
    incorrect_answers: ["Heartbleed", "Bashbug", "Stagefright"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "What port does HTTP run on?",
    correct_answer: "80",
    incorrect_answers: ["53", "443", "23"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "Lenovo acquired IBM&#039;s personal computer division, including the ThinkPad line of laptops and tablets, in what year?",
    correct_answer: "2005",
    incorrect_answers: ["1999", "2002", "2008"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "Which of these names was an actual codename for a cancelled Microsoft project?",
    correct_answer: "Neptune",
    incorrect_answers: ["Enceladus", "Pollux", "Saturn"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question:
      "Which of these was the name of a bug found in April 2014 in the publicly available OpenSSL cryptography library?",
    correct_answer: "Heartbleed",
    incorrect_answers: ["Shellshock", "Corrupted Blood", "Shellscript"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "How many Hz does the video standard PAL support?",
    correct_answer: "50",
    incorrect_answers: ["59", "60", "25"],
  },
  {
    type: "multiple",
    difficulty: "hard",
    category: "Science: Computers",
    question: "The acronym &quot;RIP&quot; stands for which of these?",
    correct_answer: "Routing Information Protocol",
    incorrect_answers: [
      "Runtime Instance Processes",
      "Regular Interval Processes",
      "Routine Inspection Protocol",
    ],
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
  let passing = 2;
  timer.innerHTML = passing;

  function gong() {
    timer.innerHTML = passing;
    passing--;

    if (passing >= 0) {
      timerInterval = setTimeout(gong, 1000);
    } else {
      indexCurrent++;
      if (indexCurrent < questionHard.length) {
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questionHard.length
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
  for (let i = questionHard.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let k = questionHard[i];
    questionHard[i] = questionHard[j];
    questionHard[j] = k;
  }
};

/*
    FUNZIONI PRINCIPALI
*/

const showQuestion = function (index) {
  const domande = questionHard[index];
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
        answered = true;
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
      if (r.value === questionHard[indexCurrent].correct_answer) {
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

      if (indexCurrent < questionHard.length - 1) {
        indexCurrent++;
        contatore.innerHTML = `QUESTION ${indexCurrent + 1} / ${
          questionHard.length
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
  const total = questionHard.length;
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
