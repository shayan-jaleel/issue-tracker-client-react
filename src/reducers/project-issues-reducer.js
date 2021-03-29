export const FIND_ISSUES_FOR_PROJECT = "FIND_ISSUES_FOR_PROJECT"
export const FIND_PROJECT = "FIND_PROJECT"
const initialState = {
    issues: [],
    project: {}
}

const projectIssuesReducer = (state = initialState, action) => {
    switch(action.type) {
        case FIND_ISSUES_FOR_PROJECT:
            console.log(FIND_ISSUES_FOR_PROJECT)
            return {
                ...state,
                issues: action.issues
            }
        case FIND_PROJECT:
            console.log(FIND_PROJECT)
            return {
                ...state,
                project: action.project
            }
        default:
            return state
    }
}

export default projectIssuesReducer