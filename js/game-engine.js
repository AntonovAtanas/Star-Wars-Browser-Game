import { movingLifeBonus, movingSpeedBonus, movingTieFighters, movingFalconLaser, falconMovement, movingDeathStar, movingDeathStarLasers, endScreen } from "./utils.js";

let progress = null;

export function start(state, game) {
    
    game.createMilleniumFalcon(state.milleniumFalcon);
    window.requestAnimationFrame(timestamp => gameLoop(state, game, timestamp));
}

function gameLoop(state, game, timestamp) {
    if(state.startTimestamp == 0){
        state.startTimestamp = timestamp;
    }

    progress = timestamp - state.startTimestamp;
    
    // Get the gameScreen
    const gameScreen = document.querySelector('.game-screen');

    // Movement of the Millenium Falcon
    falconMovement(state, progress, game)

    if (state.score <= state.deathStarSpawn) {
        // Spawn TIE Fighters
        if (progress > state.tieFighter.spawnTimestamp) {
            game.createTieFighter(state.tieFighter);
            state.tieFighter.spawnTimestamp = progress + Math.random() * state.tieFighter.spawnInterval
        }

        // Spawn of Lives bonus
        if (progress > state.livesBonus.spawnTimestamp) {
            game.createLivesBonus(state.livesBonus);
            state.livesBonus.spawnTimestamp = progress + Math.random() * state.livesBonus.spawnInterval
        }

        // Spawn of the Speed bonus
        if (progress > state.speedBonus.spawnTimestamp) {
            game.createSpeedBonus(state.speedBonus);
            state.speedBonus.spawnTimestamp = progress + Math.random() * state.speedBonus.spawnInterval
        }
    } else if (state.score > state.deathStarSpawn && state.isDeathStarSpawned == false) {
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
    if(state.gameOver == true){
        state.startTimestamp = 0;
        return endScreen(state.score)
    }

    //Moving Millenium Falcon laser
    let lasers = document.querySelectorAll('.falcon-laser');
    movingFalconLaser(lasers, state, tieFighters, game)

    //Moving Death Star
    let deathStar = document.querySelector('.death-star');
    if (deathStar) {
        movingDeathStar(deathStar, state, lasers, game.milleniumFalcon);
        if(state.gameOver == true){
            state.startTimestamp = 0;
            return endScreen(state.score)
        }
        if (progress > state.deathStarLaser.spawnTimeStamp) {

            game.createDeathStarLaser(state, deathStar);
            state.deathStarLaser.spawnTimeStamp = progress + Math.random() * state.deathStarLaser.spawnInterval;
        }
    }

    //Moving of the Death Star Lasers
    let deathStarLasers = document.querySelectorAll('.death-star-laser');
    movingDeathStarLasers(deathStarLasers, state, game.milleniumFalcon);
    if(state.gameOver == true){
        state.startTimestamp = 0;
        return endScreen(state.score)
    }   

    let lives = document.querySelector('.lives')
    if (lives) {
        lives.textContent = `Lives Left: ${state.lives}`;
    }


    //Rendering
    game.milleniumFalcon.style.top = state.milleniumFalcon.positionTop + 'px';
    game.milleniumFalcon.style.bottom = state.milleniumFalcon.positionDown + 'px';
    game.milleniumFalcon.style.left = state.milleniumFalcon.positionLeft + 'px';
    game.milleniumFalcon.style.right = state.milleniumFalcon.positionLeft + 'px';

    let score = document.querySelector('.score')
    
    if (score) {
        score.textContent = `Score: ${state.score += state.scorePerFrame}`;
    }

    window.requestAnimationFrame(gameLoop.bind(null, state, game));
};