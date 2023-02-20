let state = initialState();
let game = initGameObjects();

// Add event listener on the start button
game.startBtn.addEventListener('click', startGame);

// Add event listener on keydown

document.addEventListener('keydown', (event) => {
    state.keys[event.code] = true;
    console.log(event.code)
})

document.addEventListener('keyup', (event) => {
    state.keys[event.code] = false;
    console.log(event.code)
})

function startGame() {
    game.startBtn.classList.add('hidden');
    game.gameScreen.classList.remove('hidden')

    // Starting the game
    start(state, game);
}