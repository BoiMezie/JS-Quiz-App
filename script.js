// DOM Select
const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const quizText = document.getElementById("quiz-text");
const currentQuestion = document.getElementById("current-question");
const totalQuestion = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const answerContainer = document.getElementById("answer-container");
const progressBar = document.getElementById("progress");
const resultScreen = document.getElementById("result-screen");
const totalScore = document.getElementById("total-score");
const maxScore = document.getElementById("max-score");
const resultMessage = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");

// Quiz Questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// Quiz State Vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestion.textContent = quizQuestions.length;
maxScore.textContent = quizQuestions.length;

// EVENT LISTENERS
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  // RESET VARS
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestion.textContent = currentQuestionIndex + 1;

  const progressPercentage = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercentage + "%";

  quizText.textContent = currentQuestion.question;

  // WHAT-TODO
  answerContainer.innerHTML = ""; //Clear the innerHTML of all answer btn
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // ADDING PROPERTIES
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  })
}


function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;
  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Attach "correct" or "incorrect" to each answer
  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button == selectAnswer) {
      button.classList.add("incorrect");
    }
  });

  
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // Check if the quiz continues or is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    } else {
      showResults()
    }
  }, 1000);
}  


function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  totalScore.textContent = (score);

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage == 100) {
    resultMessage.textContent="Perfect score!"
  } else if (percentage <= 80 && percentage>= 61) {
    resultMessage.textContent="Great job!"
  } else if (percentage <= 60 && percentage >=41) {
    resultMessage.textContent="Good effort!"
  } else if (percentage <= 40 && percentage >= 21) {
    resultMessage.textContent="Not bad!"
  } else {
    resultMessage.textContent="This is too bad!!"
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
