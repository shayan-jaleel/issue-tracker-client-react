export const FIND_ALL_USERS = "FIND_ALL_USERS"
export const CREATE_USER = "CREATE_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"

//id will need to be changed when moving servers
const initialState = {
    users: []
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_ALL_USERS:
            console.log(FIND_ALL_USERS)
            return{
                ...state,
                users: action.users
            }
        case CREATE_USER:
            console.log(CREATE_USER)
            return{
                ...state,
                users: [
                        ...state.users,
                        action.user
                        ]
            }
        case DELETE_USER:
            console.log(DELETE_USER)
            return{
                ...state,
                users: state.users.filter(u => u._id !== action.userId)
            }
        case UPDATE_USER:
            console.log(UPDATE_USER)
            return{
                ...state,
                users: state.users.map(
                    u => u._id === action.user._id ? action.user : u
                )
            }
        default:
            return state
    }
}

export default userReducer