let state = initialState();
let game = initGameObjects();

game.startBtn.addEventListener('click', startGame);

function startGame() {
    game.startBtn.classList.add('hidden');
    game.gameScreen.classList.remove('hidden')

    // Starting the game
    start(state, game);
}