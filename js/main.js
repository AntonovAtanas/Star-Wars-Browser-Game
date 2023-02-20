let state = initialState();
let game = initGameObjects();

game.startBtn.addEventListener('click', startGame);

function startGame() {
    game.startBtn.classList.add('hidden');
    game.gameScreen.classList.remove('hidden')

    // Adding the Millenium Falcon
    let milleniumFalcon = document.createElement('div');
    milleniumFalcon.classList.add('millenium-falcon');
    game.gameScreen.appendChild(milleniumFalcon);

    // Starting the game
    start(state, game);

}