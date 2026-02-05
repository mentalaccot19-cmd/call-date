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
    
    // Lightning/Flash & Shake Effect
    flash.classList.add('flash-active');
    mainContent.classList.add('shake-active');
    setTimeout(() => {
        flash.classList.remove('flash-active');
        mainContent.classList.remove('shake-active');
    }, 300);

    // 1. Get Yes button's current position so we don't land on it
    const yesRect = yesBtn.getBoundingClientRect();
    const padding = 20; 
    let x, y;

    // 2. Try to find a spot that doesn't overlap with the Yes button
    for (let i = 0; i < 20; i++) {
        x = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding);
        y = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding);

        // Check for overlap
        const overlaps = (
            x < yesRect.right + padding &&
            x + noBtn.offsetWidth > yesRect.left - padding &&
            y < yesRect.bottom + padding &&
            y + noBtn.offsetHeight > yesRect.top - padding
        );

        if (!overlaps) break; // Good spot found!
    }
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // 3. Gentle Growth
    if (noCount < 10) {
        growthFactor += 0.15;
        yesBtn.style.transform = `scale(${growthFactor})`;
    } else {
        noBtn.style.display = 'none';
        yesBtn.style.transform = `scale(1.4)`;
        yesBtn.innerText = "OKAY, PICK ME! ❤️";
    }
};

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
