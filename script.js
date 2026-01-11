const subjects = document.querySelectorAll('.subject');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

let approved = JSON.parse(localStorage.getItem('approved')) || [];

subjects.forEach(sub => {
  const id = sub.dataset.id;

  if (approved.includes(id)) {
    sub.classList.add('approved');
  }

  sub.addEventListener('click', () => {
    if (sub.classList.contains('locked')) return;

    sub.classList.toggle('approved');

    if (sub.classList.contains('approved')) {
      approved.push(id);
    } else {
      approved = approved.filter(x => x !== id);
    }

    localStorage.setItem('approved', JSON.stringify(approved));
    updateProgress();
  });
});

function updateProgress() {
  const total = subjects.length;
  const done = document.querySelectorAll('.approved').length;
  const percent = Math.round((done / total) * 100);

  progressFill.style.width = percent + '%';
  progressText.textContent = `Avance total: ${percent}%`;
}

updateProgress();
