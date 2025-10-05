const video = document.getElementById('levelAnimation');
const quizSection = document.getElementById('quizSection');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');

const quizData = [
  { question: "What did the villagers face when the power went out years ago?", options: ["School closures","no Water for irrigation","lockdown","Riots"], correct: 1 },
  { question: "What stop working during the blackout in the story ?", options: ["Tractors","cars","Radios","T.V"], correct: 2 },
  { question: "what do the electritions find when they check the equipments ?", options: ["no power","short circuits","lines fail","tech glich"], correct: 0 }
];

let currentQuestion = 0;
let canProceed = false;

// Get level number from URL
const currentLevelNum = parseInt(new URLSearchParams(window.location.search).get('level'));

// When animation ends
video.addEventListener('ended', () => {
  quizSection.classList.remove('hidden');
  setTimeout(() => quizSection.classList.add('visible'), 300);
  loadQuestion();
});

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = '';
  nextBtn.classList.add('hidden');
  canProceed = false;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.classList.add('quiz-btn');
    btn.addEventListener('click', () => selectAnswer(btn, idx));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(btn, index) {
  if (canProceed) return;
  const q = quizData[currentQuestion];
  const allBtns = document.querySelectorAll('.quiz-btn');
  allBtns.forEach(b => b.disabled = true);

  if (index === q.correct) btn.classList.add('correct');
  else {
    btn.classList.add('wrong');
    allBtns[q.correct].classList.add('correct');
  }

  canProceed = true;
  nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) loadQuestion();
  else quizComplete();
});

function quizComplete() {
  questionText.textContent = "🎉 Level Completed!";
  optionsContainer.innerHTML = '';
  nextBtn.classList.add('hidden');

  // Update progress
  let progress = JSON.parse(localStorage.getItem('playerProgress')) || { completedLevel: 0 };
  if (progress.completedLevel < currentLevelNum) progress.completedLevel = currentLevelNum;
  localStorage.setItem('playerProgress', JSON.stringify(progress));

  // Redirect to map page
  setTimeout(() => window.location.href = "next.html", 1500);
}
