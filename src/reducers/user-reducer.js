export const FIND_ALL_USERS = "FIND_ALL_USERS"
export const CREATE_USER = "CREATE_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"

const initialState = {
    users: [
        {
            firstName: 'Shayan',
            lastName: 'Jaleel',
            role: 'ADMINISTRATOR',
            userName: 'hello'
        }
    ]
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_ALL_USERS:
            return{
                ...state,
                users: action.users
            }
        case CREATE_USER:
            return{
                ...state,
                users: [
                        ...state.users,
                        action.user
                        ]
            }
        case DELETE_USER:
            return{
                ...state,
                users: state.users.filter(u => u.id !== action.id)
            }
        case UPDATE_USER:
            return{
                ...state,
                users: state.users.map(
                    u => u.id === action.id ? action.user : u
                )
            }
        default:
            return state
    }
}

export default userReducer