import { movingLifeBonus, movingSpeedBonus, movingTieFighters, movingFalconLaser, falconMovement, movingDeathStar } from "./utils.js";

export function start(state, game) {
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));
}

function gameLoop(state, game, timestamp) {

    let lives = document.querySelector('.lives')

    // Get the gameScreen
    const gameScreen = document.querySelector('.game-screen');

    // Movement of the Millenium Falcon
    falconMovement(state, timestamp, game)

    if (state.score <= state.deathStarSpawn) {
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

        // Spawn of the Speed bonus

        if (timestamp > state.speedBonus.spawnTimestamp) {
            game.createSpeedBonus(state.speedBonus);
            state.speedBonus.spawnTimestamp = timestamp + Math.random() * state.speedBonus.spawnInterval
        }
    } else if(state.score > state.deathStarSpawn && state.isDeathStarSpawned == false){
        // Spawn Death Star
        state.isDeathStarSpawned = true;
        game.createDeathStar(state.deathStar);
    }

    // Moving of all Lives bonuses
    let lifeBonuses = document.querySelectorAll('.lives-bonus')
    movingLifeBonus(lifeBonuses, state, game.milleniumFalcon)

    // Moving of all Speed bonuses

    let speedBonuses = document.querySelectorAll('.speed-bonus');
    movingSpeedBonus(speedBonuses, state, game.milleniumFalcon)

    //Moving TIE Fighters
    let tieFighters = document.querySelectorAll('.tie-fighter');
    movingTieFighters(tieFighters, state, game.milleniumFalcon);

    //Moving Millenium Falcon laser
    let lasers = document.querySelectorAll('.falcon-laser');
    movingFalconLaser(lasers, state, tieFighters, game)

    //Moving Death Star
    let deathStar = document.querySelector('.death-star');
    if (deathStar){
        movingDeathStar(deathStar, state, lasers, game.milleniumFalcon)
    }

    lives.textContent = `Lives Left: ${state.lives}`;

    //Rendering
    game.milleniumFalcon.style.top = state.milleniumFalcon.positionTop + 'px';
    game.milleniumFalcon.style.bottom = state.milleniumFalcon.positionDown + 'px';
    game.milleniumFalcon.style.left = state.milleniumFalcon.positionLeft + 'px';
    game.milleniumFalcon.style.right = state.milleniumFalcon.positionLeft + 'px';

    let score = document.querySelector('.score')
    score.textContent = `Score: ${state.score += state.scorePerFrame}`;
    window.requestAnimationFrame(gameLoop.bind(null, state, game));
};