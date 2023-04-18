import { startGame } from "./main.js";
import { endScreen, movingLifeBonus, detectCollision, movingSpeedBonus, movingTieFighters, movingFalconLaser } from "./utils.js";

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
        state.livesBonus.spawnTimestamp = timestamp + Math.random() * state.livesBonus.spawnInterval
    }

    // Moving of all Lives bonuses
    let lifeBonuses = document.querySelectorAll('.lives-bonus')
    movingLifeBonus(lifeBonuses, state, game.milleniumFalcon)

    lives.textContent = `Lives Left: ${state.lives}`

    // Spawn of the Speed bonus

    if (timestamp > state.speedBonus.spawnTimestamp) {
        game.createSpeedBonus(state.speedBonus);
        state.speedBonus.spawnTimestamp = timestamp + Math.random() * state.speedBonus.spawnInterval
    }

    // Moving of all Speed bonuses

    let speedBonuses = document.querySelectorAll('.speed-bonus');
    movingSpeedBonus(speedBonuses, state, game.milleniumFalcon)

    //Rendering
    game.milleniumFalcon.style.top = state.milleniumFalcon.positionTop + 'px';
    game.milleniumFalcon.style.bottom = state.milleniumFalcon.positionDown + 'px';
    game.milleniumFalcon.style.left = state.milleniumFalcon.positionLeft + 'px';
    game.milleniumFalcon.style.right = state.milleniumFalcon.positionLeft + 'px';

    //Moving TIE Fighters
    let tieFighters = document.querySelectorAll('.tie-fighter');
    
    movingTieFighters(tieFighters, state, game.milleniumFalcon);

    //Moving Millenium Falcon laser
    let lasers = document.querySelectorAll('.falcon-laser');

    movingFalconLaser(lasers, state, tieFighters, game)

    let score = document.querySelector('.score')
    score.textContent = `Score: ${state.score += state.scorePerFrame}`;
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
            if (timestamp > state.falconLaser.laserSpawn) {
                game.createFalconLaser(state);
                state.falconLaser.laserSpawn = timestamp + state.falconLaser.maximumSpawnInterval;
            }
        };
    };
};