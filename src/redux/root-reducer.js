import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import projectReducer from "../reducers/project-reducer";
import projectIssuesReducer from "../reducers/project-issues-reducer";
import sessionReducer from "../reducers/session-reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session']
}

const rootReducer = combineReducers({
    project: projectReducer,
    projectIssues: projectIssuesReducer,
    session: sessionReducer
})

export default persistReducer(persistConfig, rootReducer)