function initialState () {
    const state = {
        milleniumFalcon: {
            height: 80,
            width: 80,
            positionTop: Math.random()*600,
            positionLeft: 0
        },
        keys: {
            KeyUp: false,
            KeyDown: false,
            KeyLeft: false,
            KeyRight: false
        }
    }

    return state;
}