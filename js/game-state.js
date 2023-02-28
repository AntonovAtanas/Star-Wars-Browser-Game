function initialState (game) {
    let startPositionTop = Math.random()*600

    const state = {
        milleniumFalcon: {
            height: 100,
            width: 100,
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
        falconLaser: {
            height: 13,
            width: 13,
            speed: 15,
            laserSpawn: 0,
            maximumSpawnInterval: 200
        },
        keys: {
            KeyW: false,
            KeyS: false,
            KeyA: false,
            KeyD: false,
            Enter: false
        },
        gameOver: false,
    }
    return state;
}