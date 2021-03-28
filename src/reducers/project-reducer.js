export const FIND_ALL_PROJECTS = "FIND_ALL_PROJECTS"
export const CREATE_PROJECT = "CREATE_PROJECT"
export const DELETE_PROJECT = "DELETE_PROJECT"
export const UPDATE_PROJECT = "UPDATE_PROJECT"

//id will need to be changed when moving servers
const initialState = {
    projects: [
        {
            name: 'BigProject101',
            description: 'This is a big project',
        },
        {
            name: 'BigProject102',
            description: 'This is a v big project',
        },
        {
            name: 'BigProject103',
            description: 'This is a vv big project',
        }
    ]
}

const projectReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_ALL_PROJECTS:
            console.log(FIND_ALL_PROJECTS)
            return{
                ...state,
                projects: action.projects
            }
        case CREATE_PROJECT:
            console.log(CREATE_PROJECT)
            return{
                ...state,
                projects: [
                    ...state.projects,
                    action.project
                ]
            }
        case DELETE_PROJECT:
            console.log(DELETE_PROJECT)
            return{
                ...state,
                projects: state.projects.filter(p => p._id !== action.projectId)
            }
        case UPDATE_PROJECT:
            console.log(UPDATE_PROJECT)
            return{
                ...state,
                projects: state.projects.map(
                    p => p._id === action.project._id ? action.project : p
                )
            }
        default:
            return state
    }
}

export default projectReducer