import { html, render } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'
import { startGame } from './main.js';

let gameDiv = document.querySelector('.game-div');

export function loseScreen(score) {
    let view = html`
    <div class="end-screen">
        <span class="end-text">Your score: ${score}</span>
        <div class="start-screen try-again" @click=${startGame}>Try again?</div>
    </div>
    `
    let gameScreen = document.querySelector('.game-screen');

    gameScreen.replaceChildren();
    render(view, gameScreen)
}

export function winScreen() {
    let view = html`
    <div class="end-screen">
        <span class="end-text">Congratulations! You won!</span>
        <div class="start-screen try-again" @click=${startGame}>Try again?</div>
    </div>
    `
    let gameScreen = document.querySelector('.game-screen');

    gameScreen.replaceChildren();
    render(view, gameScreen)
}

export function onStart() {
    let gameScreenDiv = document.createElement('div');
    gameScreenDiv.classList.add('game-screen');

    let scoreSpan = document.createElement('span');
    scoreSpan.classList.add('score');

    let livesRemaining = document.createElement('span');
    livesRemaining.textContent = 'Lives Left: 10'
    livesRemaining.classList.add('lives');

    gameScreenDiv.appendChild(scoreSpan);
    gameScreenDiv.appendChild(livesRemaining);
    gameDiv.replaceChildren(gameScreenDiv);
}

export function movingLifeBonus(lifeBonuses, state, falcon) {
    lifeBonuses.forEach(bonus => {

        if (parseInt(bonus.style.left) <= 0 - state.livesBonus.width) {
            bonus.remove();
        } else {
            bonus.style.left = parseInt(bonus.style.left) - state.livesBonus.speed + 'px';
        }

        if (detectCollision(falcon, bonus)) {
            bonus.remove();
            state.lives += 1;
        }
    });
}

export function movingTieFighters(tieFighters, state, falcon) {
    tieFighters.forEach(element => {
        // remove TIE fighter element when out of the screen
        if (parseInt(element.style.left) <= 0 - state.tieFighter.width) {
            element.remove();
            state.lives -= 1;
            if (state.lives === 0) {
                return state.gameOver = true;
            }
        } else {
            element.style.left = parseInt(element.style.left) - state.tieFighter.speed + 'px';
        }

        if (detectCollision(falcon, element)) {
            return state.gameOver = true;
        }
    })
}

export function movingSpeedBonus(speedBonuses, state, falcon) {
    speedBonuses.forEach(bonus => {
        if (parseInt(bonus.style.left) <= 0 - state.speedBonus.width) {
            bonus.remove();
        } else {
            bonus.style.left = parseInt(bonus.style.left) - state.speedBonus.speed + 'px';
        }

        if (detectCollision(falcon, bonus)) {
            bonus.remove();
            state.milleniumFalcon.speed += 1;
        }
    })
}

export function movingDeathStar(deathStar, state, lasers, falcon) {
    if (state.deathStar.moveDown == true) {
        deathStar.style.top = parseInt(deathStar.style.top) + state.deathStar.speed + 'px';
    } else {
        deathStar.style.top = parseInt(deathStar.style.top) - state.deathStar.speed + 'px';
    }

    if (parseInt(deathStar.style.top) <= 0) {
        state.deathStar.moveDown = true;
    }

    if (parseInt(deathStar.style.top) + state.deathStar.width + 15 >= gameDiv.offsetHeight) {
        state.deathStar.moveDown = false;
    }

    lasers.forEach(laser => {
        if (detectCollision(deathStar, laser)) {
            laser.remove();
            state.score += 2000;
        }
    })

    if (detectCollision(deathStar, falcon)) {
        loseScreen(state.score);
    }
}

export function movingDeathStarLasers(deathStarLasers, state, falcon) {
    deathStarLasers.forEach(laser => {
        // Remove laser when out of the screen
        if (parseInt(laser.style.left) <= 0 - state.deathStarLaser.width) {
            laser.remove();
        } else {
            laser.style.left = parseInt(laser.style.left) - state.deathStarLaser.speed + 'px';
        }

        if (state.score >= 60000) {
            state.deathStarLaser.speed = 17
        }

        if (state.score >= 75000) {
            state.deathStarLaser.spawnInterval = 3000;
        }


        if (detectCollision(falcon, laser)) {
            return state.gameOver = true;
        }
    })
}

export function movingFalconLaser(lasers, state, tieFighters, game) {
    lasers.forEach(element => {
        // remove laser element when out of the screen
        if (parseInt(element.style.left) + state.falconLaser.width + 15 >= game.gameScreen.offsetWidth) {
            element.remove();
        } else {
            element.style.left = parseInt(element.style.left) + state.falconLaser.speed + 'px';
        }

        tieFighters.forEach(tie => {
            if (detectCollision(tie, element)) {
                state.score += state.killBonus;
                tie.remove();
                element.remove();
                if (state.tieFighter.spawnInterval > 800) {
                    if (state.tieFighter.speed < 6) {
                        state.tieFighter.speed += 0.25;
                    }

                    state.tieFighter.spawnInterval -= 125;
                }
            }
        })
    })
}

export function falconMovement(state, timestamp, game) {
    if (state.keys['KeyS'] && state.milleniumFalcon.positionTop < document.querySelector('.game-div').offsetHeight - state.milleniumFalcon.height - 5) {
        state.milleniumFalcon.positionTop += state.milleniumFalcon.speed;
    };

    if (state.keys['KeyW'] && state.milleniumFalcon.positionTop > -12) {
        state.milleniumFalcon.positionTop -= state.milleniumFalcon.speed;
    };

    if (state.keys['KeyD'] && state.milleniumFalcon.positionLeft < game.gameScreen.offsetWidth - state.milleniumFalcon.width - 15) {
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

export function detectCollision(elementA, elementB) {
    let firstObj = elementA.getBoundingClientRect();
    let secondObj = elementB.getBoundingClientRect();

    let hasCollision = !(firstObj.top > secondObj.bottom || firstObj.bottom < secondObj.top || firstObj.right < secondObj.left || firstObj.left > secondObj.right);

    return hasCollision;
}