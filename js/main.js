const startBtn = document.querySelector('.start-screen')
startBtn.addEventListener('click', start);

const gameScreen = document.querySelector('.game-screen');

function start(){
    startBtn.classList.add('hidden');

    let milleniumFalcon = document.createElement('div');
    milleniumFalcon.classList.add('millenium-falcon');
    gameScreen.appendChild(milleniumFalcon);

}

