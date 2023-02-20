let state = initialState();

let game = initGameObjects()

game.startBtn.addEventListener('click', start);

function start() {
    game.startBtn.classList.add('hidden');
    game.gameScreen.classList.remove('hidden')

    let milleniumFalcon = document.createElement('div');
    milleniumFalcon.classList.add('millenium-falcon');
    game.gameScreen.appendChild(milleniumFalcon);

}