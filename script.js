const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContent = document.getElementById('main-content');
const celebration = document.getElementById('celebration');
const audio = document.getElementById('audio');

let growthFactor = 1;

const moveButton = () => {
    // 1. Move the No button to a random spot
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // 2. Make the Yes button grow its font-size
    // This allows the CSS heartbeat scale to keep working separately!
    growthFactor += 0.2;
    yesBtn.style.fontSize = `${1.2 * growthFactor}rem`;
    yesBtn.style.padding = `${15 * growthFactor}px ${35 * growthFactor}px`;
};

// Handlers for both Mobile (touchstart) and Desktop (mouseover)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents the phone from clicking the button
    moveButton();
});

noBtn.addEventListener('mouseover', moveButton);

// Success action
yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');
    celebration.classList.remove('hidden');
    
    // Play the celebration sound
    audio.play().catch(error => {
        console.log("Autoplay prevented, but since this is a click, it should work!");
    });
});
