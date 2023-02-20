function start(state, game) {
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
}

function gameLoop(state, game) {
    // Movement of the Millenium Falcon
    if (state.keys['ArrowDown']) {
        state.milleniumFalcon.positionTop += 5;
    };
    
    if (state.keys['ArrowUp']) {
        state.milleniumFalcon.positionTop -= 5;
    };

    if (state.keys['ArrowRight']) {
        state.milleniumFalcon.positionLeft += 5;
    };

    if (state.keys['ArrowLeft']) {
        state.milleniumFalcon.positionLeft -= 5;
    };



    //Rendering
    game.milleniumFalcon.style.top = state.milleniumFalcon.positionTop + 'px';
    game.milleniumFalcon.style.bottom = state.milleniumFalcon.positionDown + 'px';
    game.milleniumFalcon.style.left = state.milleniumFalcon.positionLeft + 'px';
    game.milleniumFalcon.style.right = state.milleniumFalcon.positionLeft + 'px';

    window.requestAnimationFrame(gameLoop.bind(null, state, game));
};