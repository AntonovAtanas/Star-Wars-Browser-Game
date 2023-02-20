function initGameObjects() {
    const startBtn = document.querySelector('.start-screen');
    const gameScreen = document.querySelector('.game-screen');

    return {
        startBtn,
        gameScreen,
        createMilleniumFalcon (initialState) {
           let milleniumFalcon = document.createElement('div');
           milleniumFalcon.classList.add('millenium-falcon');
           milleniumFalcon.style.height = + initialState.milleniumFalcon.height + 'px';
           milleniumFalcon.style.width = initialState.milleniumFalcon.width + 'px';
           game.gameScreen.appendChild(milleniumFalcon);
        },

    }
}