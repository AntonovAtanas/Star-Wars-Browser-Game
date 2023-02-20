function start(state, game){
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(gameLoop.bind(null, state,game));
}

function gameLoop(state, game) {
    console.log(state, game)
    window.requestAnimationFrame(gameLoop.bind(null, state,game));
};