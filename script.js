const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContent = document.getElementById('main-content');
const celebration = document.getElementById('celebration');
const audio = document.getElementById('audio');
const flash = document.getElementById('flash-overlay');

let growthFactor = 1;
let noCount = 0;

// 1. Floating Hearts Background
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 400);

// 2. Button Movement Logic
const moveButton = () => {
    noCount++;
    
    // Effects
    flash.classList.add('flash-active');
    mainContent.classList.add('shake-active');
    setTimeout(() => {
        flash.classList.remove('flash-active');
        mainContent.classList.remove('shake-active');
    }, 300);

    // Safe Boundary Calculation
    const padding = 60; // Extra room for thumbs
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    const x = Math.max(padding/2, Math.random() * maxX);
    const y = Math.max(padding/2, Math.random() * maxY);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Gentle Growth (Stops at 10 to keep it mobile friendly)
    if (noCount < 10) {
        growthFactor += 0.12;
        yesBtn.style.transform = `scale(${growthFactor})`;
    } else {
        noBtn.style.display = 'none'; // Hide No after 10 tries
        yesBtn.style.transform = `scale(1.4)`;
        yesBtn.innerText = "PLEASE? ❤️";
    }
};

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
noBtn.addEventListener('mouseover', moveButton);

// 3. Success Action
yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    celebration.classList.remove('hidden');
    
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffffff']
    });

    audio.play().catch(() => console.log("Audio needs user tap first"));
});
