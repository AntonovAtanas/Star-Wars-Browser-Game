
let game = initGameObjects();
let state = initialState(game);

// Add event listener on the start button
game.startBtn.addEventListener('click', startGame);

// Array of available keys

let availableKeys = [
    'KeyW',
    'KeyS',
    'KeyA',
    'KeyD',
    'Enter'
]

// Add event listener on pressed key

document.addEventListener('keydown', (event) => {
    if (availableKeys.includes(event.code)) {
        state.keys[event.code] = true;
    }
})

document.addEventListener('keyup', (event) => {
    if (availableKeys.includes(event.code)) {
        state.keys[event.code] = false;
    }
})

function startGame() {
    game.startBtn.classList.add('hidden');

    // Starting the game
    start(state, game);
}