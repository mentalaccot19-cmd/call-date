const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContent = document.getElementById('main-content');
const celebration = document.getElementById('celebration');
const audio = document.getElementById('audio');
const flash = document.getElementById('flash-overlay');

let growthFactor = 1;
let noCount = 0;

// 1. Create Floating Hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 400);

const moveButton = () => {
    noCount++;
    
    // Lightning/Flash & Shake Effect
    flash.classList.add('flash-active');
    mainContent.classList.add('shake-active');
    setTimeout(() => {
        flash.classList.remove('flash-active');
        mainContent.classList.remove('shake-active');
    }, 300);

    // Random Move
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${Math.random() * maxX}px`;
    noBtn.style.top = `${Math.random() * maxY}px`;

    // Growth
    growthFactor += 0.2;
    yesBtn.style.fontSize = `${1.2 * growthFactor}rem`;
    yesBtn.style.padding = `${15 * growthFactor}px ${35 * growthFactor}px`;

    if (noCount >= 10) {
        noBtn.style.display = 'none';
        yesBtn.innerText = "JUST SAY YES! ❤️";
    }
};

noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveButton(); });
noBtn.addEventListener('mouseover', moveButton);

yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    celebration.classList.remove('hidden');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    audio.play();
});
