const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContent = document.getElementById('main-content');
const celebration = document.getElementById('celebration');
const audio = document.getElementById('audio');

let growthFactor = 1;
let noCount = 0;

const moveButton = () => {
    noCount++;

    // Move No Button
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Growth Logic
    growthFactor += 0.2;
    yesBtn.style.fontSize = `${1.2 * growthFactor}rem`;
    yesBtn.style.padding = `${15 * growthFactor}px ${35 * growthFactor}px`;

    if (noCount >= 10) {
        noBtn.style.display = 'none';
        yesBtn.innerText = "YOU HAVE NO CHOICE NOW! ❤️";
    }

    document.title = "Hey! Pick Yes! 🥺";
};

noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
});
noBtn.addEventListener('mouseover', moveButton);

yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    celebration.classList.remove('hidden');
    document.title = "Call at 9! ✅";

    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffffff', '#ffccd5']
    });

    audio.play();
});
