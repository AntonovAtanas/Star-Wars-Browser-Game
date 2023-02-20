function start(state, game){
    window.requestAnimationFrame(gameLoop.bind(null, state,game));
}

function gameLoop(state, game) {
    console.log(state, game)
    window.requestAnimationFrame(gameLoop.bind(null, state,game));
};