export function initialState () {
    let startPositionTop = Math.random()*600

    const state = {
        milleniumFalcon: {
            height: 106,
            width: 132,
            positionTop: startPositionTop,
            positionLeft: 0,
            positionRight: 0,
            positionDown: 0,
            speed: 5,
            
        },
        tieFighter: {
            height: 64,
            width: 64,
            positionTop: 0,
            positionLeft: 0,
            positionRight: 0,
            positionDown: 0,
            speed: 3,
            spawnTimestamp: 0,
            spawnInterval: 5000
        },
        deathStar: {
            height: 128,
            width: 128,
            positionTop: 0,
            positionLeft: 0,
            positionRight: 0,
            positionDown: 0,
            speed: 3,
            moveDown: false
        },
        deathStarLaser: {
            height: 13,
            width: 13,
            speed: 15,
            spawnTimeStamp: 0,
            spawnInterval: 5000,
        },
        falconLaser: {
            height: 13,
            width: 13,
            speed: 15,
            laserSpawn: 0,
            maximumSpawnInterval: 200
        },
        livesBonus: {
            height: 13,
            width: 13,
            speed: 12,
            spawnInterval: 15000,
            spawnTimestamp: 15000,
        },
        speedBonus: {
            height: 13,
            width: 13,
            speed: 12,
            spawnInterval: 20000,
            spawnTimestamp: 20000
        },
        keys: {
            KeyW: false,
            KeyS: false,
            KeyA: false,
            KeyD: false,
            Enter: false
        },
        gameOver: false,
        score: 0,
        scorePerFrame: 1,
        killBonus: 1000,
        lives: 10,
        deathStarSpawn: 5000,
        scoreToWin: 10000,
        isDeathStarSpawned: false,
        startTimestamp: 0
    }
    return state;
}