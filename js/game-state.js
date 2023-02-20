function initialState () {
    let startPositionTop = Math.random()*600

    const state = {
        milleniumFalcon: {
            height: 80,
            width: 80,
            positionTop: startPositionTop,
            positionLeft: 0,
            positionRight: 0,
            positionDown: 0,
            speed: 5,
            
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