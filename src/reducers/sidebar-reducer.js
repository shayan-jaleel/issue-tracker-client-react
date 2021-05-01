export const SET_SIDEBAR_ACTIVE_MANAGE_USERS = "SIDEBAR_ACTIVE_MANAGE_USERS"
export const SET_SIDEBAR_ACTIVE_MY_PROJECTS = "SIDEBAR_ACTIVE_MY_PROJECTS"
export const SET_SIDEBAR_ACTIVE_MY_ISSUES = "SIDEBAR_ACTIVE_MY_ISSUES"
export const SET_SIDEBAR_ACTIVE_MY_PROFILE = "SIDEBAR_ACTIVE_MY_PROFILE"

const initialState = {
    sidebarActive: null
}

const sidebarReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SIDEBAR_ACTIVE_MANAGE_USERS:
            console.log(SET_SIDEBAR_ACTIVE_MANAGE_USERS)
            return {
                ...state,
                sidebarActive: SET_SIDEBAR_ACTIVE_MANAGE_USERS
            }
        case SET_SIDEBAR_ACTIVE_MY_PROJECTS:
            console.log(SET_SIDEBAR_ACTIVE_MY_PROJECTS)
            return {
                ...state,
                sidebarActive: SET_SIDEBAR_ACTIVE_MY_PROJECTS
            }
        case SET_SIDEBAR_ACTIVE_MY_ISSUES:
            console.log(SET_SIDEBAR_ACTIVE_MY_ISSUES)
            return {
                ...state,
                sidebarActive: SET_SIDEBAR_ACTIVE_MY_ISSUES
            }
        case SET_SIDEBAR_ACTIVE_MY_PROFILE:
            console.log(SET_SIDEBAR_ACTIVE_MY_PROFILE)
            return {
                ...state,
                sidebarActive: SET_SIDEBAR_ACTIVE_MY_PROFILE
            }
        default:
            return state
    }
}
export default sidebarReducer