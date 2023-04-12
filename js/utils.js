import { html, render } from '../node_modules/lit-html/lit-html.js'
import { startGame } from './main.js';

let gameDiv = document.querySelector('.game-div');

export function endScreen(score) {
    let view = html`
    <div class="end-screen">
        <span class="end-text">Your score: ${score}</span>
        <div class="start-screen" @click=${startGame}>Try again?</div>
    </div>
    `
    let gameScreen = document.querySelector('.game-screen');
    gameDiv.removeChild(gameScreen);
    render(view, gameDiv)
}

export function onStart() {
    let gameScreenDiv = document.createElement('div');
    gameScreenDiv.classList.add('game-screen');

    let scoreSpan = document.createElement('span');
    scoreSpan.classList.add('score');

    gameScreenDiv.appendChild(scoreSpan);
    gameDiv.replaceChildren(gameScreenDiv);
}