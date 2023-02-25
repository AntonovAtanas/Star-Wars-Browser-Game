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
            speed: 4,
        },
        keys: {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRigth: false
        }
    }
    return state;
}