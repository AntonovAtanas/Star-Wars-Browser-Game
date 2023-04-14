import { startGame } from "./main.js";
import { endScreen } from "./utils.js";

export function start(state, game) {
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));
}

function gameLoop(state, game, timestamp) {

    let lives = document.querySelector('.lives')

    // Get the gameScreen
    const gameScreen = document.querySelector('.game-screen');

    // Movement of the Millenium Falcon
    falconMovement();

    // Spawn TIE Fighters
    if (timestamp > state.tieFighter.spawnTimestamp) {
        game.createTieFighter(state.tieFighter);
        state.tieFighter.spawnTimestamp = timestamp + Math.random() * state.tieFighter.spawnInterval
    }

    // Spawn of Lives bonus

    if (timestamp > state.livesBonus.spawnTimestamp) {
        game.createLivesBonus(state.livesBonus);
        state.livesBonus.spawnTimestamp = timestamp + Math.random() * state.tieFighter.spawnInterval
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
            state.lives -= 1;
            if (state.lives === 0){
                endScreen(state.score)
            } else {
                lives.textContent = `Lives Left: ${state.lives}`
            }
        } else {
            element.style.left = parseInt(element.style.left) - state.tieFighter.speed + 'px';
        }

        if (detectCollision(game.milleniumFalcon, element)){
            state.gameOver = true;

        }
    })

    //Moving Millenium Falcon laser
    let lasers = document.querySelectorAll('.falcon-laser');

    lasers.forEach(element => {
        // remove laser element when out of the screen
        if (parseInt(element.style.left) + state.falconLaser.width + 15 >= game.gameScreen.offsetWidth) {
            element.remove();
        } else {
            element.style.left = parseInt(element.style.left) + state.falconLaser.speed + 'px';
        }

        tieFighters.forEach(tie => {
            if (detectCollision(tie, element)){
                state.score += state.killBonus;
                tie.remove();
                element.remove();
                if (state.tieFighter.spawnInterval > 800){
                    if (state.tieFighter.speed < 6){
                        state.tieFighter.speed += 0.25;
                    }
                    
                    state.tieFighter.spawnInterval -= 125;
                }
            }
        })
    })
    if (state.gameOver){
        
        endScreen(state.score)
    } else {
        let score = document.querySelector('.score')
        score.textContent = `Score: ${state.score += state.scorePerFrame}`;
        window.requestAnimationFrame(gameLoop.bind(null, state, game));
    }
    
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