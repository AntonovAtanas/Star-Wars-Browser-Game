function start(state, game) {
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));
}

function gameLoop(state, game, timestamp) {

    // Get the gameScreen
    const gameScreen = document.querySelector('.game-screen');

    // Movement of the Millenium Falcon
    falconMovement();

    // Spawn TIE Fighters
    if (timestamp > state.tieFighter.spawnTimestamp) {
        game.createTieFighter(state.tieFighter);
        state.tieFighter.spawnTimestamp = timestamp + Math.random() * state.tieFighter.spawnInterval
    }

    //Rendering
    game.milleniumFalcon.style.top = state.milleniumFalcon.positionTop + 'px';
    game.milleniumFalcon.style.bottom = state.milleniumFalcon.positionDown + 'px';
    game.milleniumFalcon.style.left = state.milleniumFalcon.positionLeft + 'px';
    game.milleniumFalcon.style.right = state.milleniumFalcon.positionLeft + 'px';

    //Moving TIE Fighters
    let tieFighters = document.querySelectorAll('.tie-fighter');
    tieFighters.forEach(element => element.style.left = parseInt(element.style.left) - state.tieFighter.speed + 'px');

    //Moving Millenium Falcon laser
    let lasers = document.querySelectorAll('.falcon-laser');

    lasers.forEach(element => {
        
        if (parseInt(element.style.left) + state.falconLaser.width + 5 >= game.gameScreen.offsetWidth){
            // remove laser element when out of the screen
            element.remove();
        } else {
            element.style.left = parseInt(element.style.left) + state.falconLaser.speed + 'px';
        }
        
    })

    window.requestAnimationFrame(gameLoop.bind(null, state, game));
};

function falconMovement(){
    if (state.keys['ArrowDown'] && state.milleniumFalcon.positionTop < document.querySelector('.game-div').offsetHeight - state.milleniumFalcon.height - 5) {
        state.milleniumFalcon.positionTop += state.milleniumFalcon.speed;
    };

    if (state.keys['ArrowUp'] && state.milleniumFalcon.positionTop > -12) {
        state.milleniumFalcon.positionTop -= state.milleniumFalcon.speed;
    };

    if (state.keys['ArrowRight'] && state.milleniumFalcon.positionLeft < game.gameScreen.offsetWidth - state.milleniumFalcon.width - 1) {
        state.milleniumFalcon.positionLeft += state.milleniumFalcon.speed
    };

    if (state.keys['ArrowLeft'] && state.milleniumFalcon.positionLeft > -7) {
        state.milleniumFalcon.positionLeft -= state.milleniumFalcon.speed;
    };

    if (state.keys['Space']){
        game.createFalconLaser(state);
    }
}