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

    tieFighters.forEach(element => {
        // remove TIE fighter element when out of the screen
        if (parseInt(element.style.left) <= 0 - state.tieFighter.width) {
            element.remove();
        } else {
            element.style.left = parseInt(element.style.left) - state.tieFighter.speed + 'px';
        }
    })

    //Moving Millenium Falcon laser
    let lasers = document.querySelectorAll('.falcon-laser');

    lasers.forEach(element => {
        // remove laser element when out of the screen
        if (parseInt(element.style.left) + state.falconLaser.width + 8 >= game.gameScreen.offsetWidth) {
            element.remove();
        } else {
            element.style.left = parseInt(element.style.left) + state.falconLaser.speed + 'px';
        }

        tieFighters.forEach(bug => {
            if (detectCollision(bug, element)){
                bug.remove();
                element.remove();
            }
        })
    })

    window.requestAnimationFrame(gameLoop.bind(null, state, game));

    function falconMovement() {
        if (state.keys['KeyS'] && state.milleniumFalcon.positionTop < document.querySelector('.game-div').offsetHeight - state.milleniumFalcon.height - 5) {
            state.milleniumFalcon.positionTop += state.milleniumFalcon.speed;
        };
    
        if (state.keys['KeyW'] && state.milleniumFalcon.positionTop > -12) {
            state.milleniumFalcon.positionTop -= state.milleniumFalcon.speed;
        };
    
        if (state.keys['KeyD'] && state.milleniumFalcon.positionLeft < game.gameScreen.offsetWidth - state.milleniumFalcon.width - 1) {
            state.milleniumFalcon.positionLeft += state.milleniumFalcon.speed
        };
    
        if (state.keys['KeyA'] && state.milleniumFalcon.positionLeft > -7) {
            state.milleniumFalcon.positionLeft -= state.milleniumFalcon.speed;
        };
    
        if (state.keys['Enter']) {
            if (timestamp > state.falconLaser.laserSpawn){
                game.createFalconLaser(state);
                state.falconLaser.laserSpawn = timestamp + state.falconLaser.maximumSpawnInterval;
            }

        };
    };
};



function detectCollision(elementA, elementB){
    let firstObj = elementA.getBoundingClientRect();
    let secondObj = elementB.getBoundingClientRect();

    let hasCollision = !(firstObj.top > secondObj.bottom || firstObj.bottom < secondObj.top || firstObj.right < secondObj.left || firstObj.left > secondObj.right);

    return hasCollision;
}