const timerSection = document.querySelector('.timer');
const progressBar = document.querySelector('.progress_bar');
const timerBlock = document.querySelector('.timer__text');

function updateTimer() {
    const now = new Date();
    const endDate = new Date('2028-07-01T00:00:00');
    const diff = endDate - now;

    if (diff <= 0) {
        timerBlock.textContent = 'Time is up!';
        clearInterval(timerInterval);
        return;
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    document.querySelector('.timer__text').textContent = 
       `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

timerSection.addEventListener('mouseenter', function () {
    progressBar.classList.add('active');
});

timerSection.addEventListener('mouseleave', function () {
    progressBar.classList.remove('active');
});
