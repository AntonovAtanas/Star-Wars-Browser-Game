import { initGameObjects } from './game-objects.js'
import { initialState } from './game-state.js'
import { start } from './game-engine.js'
import { onStart } from './utils.js'

export let game
export let state

// Add event listener on the start button
document.querySelector('.start-screen').addEventListener('click', startGame);

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

export function startGame() {
    onStart()
    game = initGameObjects();
    state = initialState(game);

    // Starting the game
    start(state, game);
}