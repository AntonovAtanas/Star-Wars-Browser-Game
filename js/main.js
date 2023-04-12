import { initGameObjects } from './game-objects.js'
import { initialState } from './game-state.js'
import { start } from './game-engine.js'


export let game = initGameObjects();
export let state = initialState(game);

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
    game.gameScreen.classList.remove('hidden');


    // Starting the game
    start(state, game);
}