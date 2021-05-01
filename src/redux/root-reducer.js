import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'

import projectReducer from "../reducers/project-reducer";
import projectIssuesReducer from "../reducers/project-issues-reducer";
import sessionReducer from "../reducers/session-reducer";
import sidebarReducer from "../reducers/sidebar-reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['session']
}

const rootReducer = combineReducers({
    project: projectReducer,
    projectIssues: projectIssuesReducer,
    session: sessionReducer,
    sidebar: sidebarReducer
})

export default persistReducer(persistConfig, rootReducer)