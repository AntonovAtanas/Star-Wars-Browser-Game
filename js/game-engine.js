function start(state, game) {
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
}

function gameLoop(state, game) {
    // Movement of the Millenium Falcon
    if (state.keys['ArrowDown']) {
        state.milleniumFalcon.positionTop += 5;
    }
    
    if (state.keys['ArrowUp']) {
        state.milleniumFalcon.positionTop -= 5;
    }

    //Rendering
    game.milleniumFalcon.style.top = state.milleniumFalcon.positionTop + 'px';
    game.milleniumFalcon.style.bottom = state.milleniumFalcon.positionDown + 'px';

    window.requestAnimationFrame(gameLoop.bind(null, state, game));
};