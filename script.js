const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContent = document.getElementById('main-content');
const celebration = document.getElementById('celebration');
const audio = document.getElementById('audio');

let yesSize = 1;

const moveButton = () => {
    // 1. Move the No button
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // 2. Make the Yes button slightly bigger each time
    yesSize += 0.1;
    yesBtn.style.transform = `scale(${yesSize})`;
};

// Touch for mobile, Mouseover for desktop
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
noBtn.addEventListener('mouseover', moveButton);

// Success Action
yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    celebration.classList.remove('hidden');
    audio.play();
});
