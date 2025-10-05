const TOTAL_LEVELS = 10;
const levelMap = document.getElementById('levelMap');

// Get player progress from localStorage
function getPlayerProgress() {
  const progress = localStorage.getItem('playerProgress');
  return progress ? JSON.parse(progress) : { completedLevel: 0 };
}

// Save player progress to localStorage
function savePlayerProgress(progress) {
  localStorage.setItem('playerProgress', JSON.stringify(progress));
}

// Render the level map
function renderLevels() {
  const progress = getPlayerProgress();
  levelMap.innerHTML = '';

  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const level = document.createElement('div');
    level.classList.add('level');
    level.textContent = `Level ${i}`;

    if (i <= progress.completedLevel) {
      level.classList.add('completed'); // Finished
    } else if (i === progress.completedLevel + 1) {
      level.classList.add('unlocked'); // Next level
    } else {
      level.classList.add('locked'); // Cannot play yet
    }

    level.addEventListener('click', () => {
  if (!level.classList.contains('locked')) {
    window.location.href = `animation${i}.html`;
  }
});


    levelMap.appendChild(level);
  }
}

// Initialize map on page load
document.addEventListener('DOMContentLoaded', renderLevels);

