import { game } from './main.js'

export function initGameObjects() {
    const gameScreen = document.querySelector('.game-screen');

    return {
        gameScreen,
        createMilleniumFalcon(initialState) {
            let milleniumFalcon = document.createElement('div');
            milleniumFalcon.classList.add('millenium-falcon');

            milleniumFalcon.style.height = initialState.height + 'px';
            milleniumFalcon.style.width = initialState.width + 'px';
            milleniumFalcon.style.top = initialState.positionTop + 'px';
            milleniumFalcon.style.left = initialState.positionLeft + 'px';

            this.milleniumFalcon = milleniumFalcon;
            game.gameScreen.appendChild(milleniumFalcon);
            return milleniumFalcon;
        },
        createTieFighter(initialState) {
            let tieFighter = document.createElement('div');
            tieFighter.classList.add('tie-fighter');

            tieFighter.style.height = initialState.height + 'px';
            tieFighter.style.width = initialState.width + 'px';

            tieFighter.style.top = Math.random() * 600 + 'px';
            tieFighter.style.left = gameScreen.offsetWidth - initialState.width + 'px';

            this.tieFighter = tieFighter;
            game.gameScreen.appendChild(tieFighter);
            return tieFighter;
        },
        createDeathStar(initialState){
            let deathStar = document.createElement('div');
            deathStar.classList.add('death-star');

            deathStar.style.height = initialState.height + 'px';
            deathStar.style.width = initialState.width + 'px';

            deathStar.style.top = Math.random() * 600 + 'px';
            deathStar.style.left = gameScreen.offsetWidth - initialState.width + 'px';

            this.deathStar = deathStar;
            game.gameScreen.appendChild(deathStar);

            return deathStar;
        },
        createDeathStarLaser(initialState, deathStar){
            let deathStarLaser = document.createElement('div');
            deathStarLaser.classList.add('death-star-laser');

            deathStarLaser.style.height = initialState.deathStarLaser.height + 'px';
            deathStarLaser.style.width = initialState.deathStarLaser.width + 'px';

            deathStarLaser.style.top = (parseInt(deathStar.style.top) + initialState.deathStar.height / 2 - 12) + 'px';
            deathStarLaser.style.left = (parseInt(deathStar.style.left) - 20) + 'px';

            game.gameScreen.appendChild(deathStarLaser);
            this.deathStarLaser = deathStarLaser;
            return deathStarLaser;
        },
        createLivesBonus(initialState){
            let lifeBonus = document.createElement('div');
            lifeBonus.classList.add('lives-bonus');

            lifeBonus.style.height = initialState.height + 'px';
            lifeBonus.style.width = initialState.width + 'px';

            lifeBonus.style.top = Math.random() * 600 + 'px';
            lifeBonus.style.left = gameScreen.offsetWidth - initialState.width + 'px';

            this.lifeBonus = lifeBonus;
            game.gameScreen.appendChild(lifeBonus);
            return lifeBonus
        },
        createSpeedBonus(initialState){
            let speedBonus = document.createElement('div');
            speedBonus.classList.add('speed-bonus');

            speedBonus.style.height = initialState.height + 'px';
            speedBonus.style.width = initialState.width + 'px';

            speedBonus.style.top = Math.random() * 600 + 'px';
            speedBonus.style.left = gameScreen.offsetWidth - initialState.width + 'px';

            this.speedBonus = speedBonus;
            game.gameScreen.appendChild(speedBonus);
            return speedBonus;
        },
        createFalconLaser(initialState) {
            let laser = document.createElement('div');
            laser.classList.add('falcon-laser');

            laser.style.height = initialState.falconLaser.height + 'px';
            laser.style.width = initialState.falconLaser.width + 'px';

            laser.style.top = (initialState.milleniumFalcon.positionTop + initialState.milleniumFalcon.height / 2 - 12) + 'px';
            laser.style.left = (initialState.milleniumFalcon.positionLeft + initialState.milleniumFalcon.width - 20) + 'px';

            game.gameScreen.appendChild(laser);
            this.laser = laser;
            return laser;
        }

    }
}