export const SET_CURRENT_USER = "SET_CURRENT_USER"

const initialState = {
    userLoggedIn: null
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            console.log(SET_CURRENT_USER)
            return{
                ...state,
                userLoggedIn: action.userLoggedIn
            }
        default:
            return state
    }
}

export default sessionReducer