const keys = document.querySelectorAll('.key');
const recBtn = document.querySelector(".record");
const playbackBtn = document.querySelector(".playback");
const soundsToBePlayed = [];
let recording = false;

window.addEventListener('keydown', function(event) {
    if (recording) recordSound(event.key);
    playSound(event.key);
});
keys.forEach(key => {
    key.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Prevent the default touch behavior, like scrolling
        const keyAttribute = this.getAttribute('data-key');
        playSound(keyAttribute);
    });
  });
function playSound(key) {
    const audio = document.querySelector(`audio[data-key="${key.toUpperCase()}"]`);
    const keyElement = document.querySelector(`.key[data-key="${key.toUpperCase()}"]`);
    if (!audio) return;
    keyElement.classList.add('active');
    audio.currentTime = 0; // Rewind to the start
    audio.play();
    setTimeout(() => {
        keyElement.classList.remove('active');
    }, 100);
}

function recordSound(key) {
    soundsToBePlayed.push(key.toUpperCase());
}

recBtn.addEventListener('click', () => {
    recording = !recording;
    if (recording) {
        soundsToBePlayed.length = 0; // Clear existing recordings
    }
});

playbackBtn.addEventListener('click', () => {
    if (soundsToBePlayed.length === 0) return;
    playSounds(soundsToBePlayed);
});

function playSounds(arr) {
    let index = 0;
    const interval = setInterval(() => {
        if (index < arr.length) {
            playSound(arr[index]);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 400); // Adjust playback speed as needed
}

keys.forEach(key => {
    key.addEventListener('click', function() {
        const keyAttribute = this.getAttribute('data-key');
        if (recording) recordSound(keyAttribute);
        playSound(keyAttribute);
    });
});



