import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/home-page'
import LoginPage from "./components/login/login-page";
import Issues from "./components/issues/issues-page";
import CreateIssue from "./components/issues/create-issue"
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ManageUsers from "./components/users/manage-users"
import projectReducer from "./reducers/project-reducer";
import ProjectsTable from "./components/projects/projects-table";
import projectIssuesReducer from "./reducers/project-issues-reducer";
import ProjectDetails from "./components/projects/project-details";
import IssuesTable from "./components/issues/issues-table";
import IssueDetails from "./components/issues/issue-details";
import IssuesPage from "./components/issues/issues-page";
import SignupPage from "./components/login/signup-page";
import ProfilePage from "./components/profile/profile-page";
import sessionReducer from "./reducers/session-reducer";
import LandingPage from "./components/home/landing-page";
import UserProfile from "./components/users/user-profile";
import {PersistGate} from "redux-persist/integration/react"
import {store, persistor} from "./redux/store";
import CreateProject from "./components/projects/create-project";

// const reducer = combineReducers({
//     userReducer: userReducer,
//     projectReducer: projectReducer,
//     projectIssuesReducer: projectIssuesReducer,
//     sessionReducer: sessionReducer
// })
//
// const store = createStore(reducer)

function App() {
  return (
      <div>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <Navbar/>
                    {/*<div className="row"><Navbar/></div>*/}
                    <div className="row">
                        <div className="col-2">
                            <Sidebar/>
                        </div>
                        <div className="col-8">
                            <div className="container-fluid">
                                <Route path="/" exact={true} component={Home}/>
                                <Route path="/user-roles" exact={true} component={ManageUsers}/>
                                <Route path="/login" exact={true} component={LoginPage}/>
                                <Route path="/signup" exact={true} component={SignupPage}/>
                                <Route path="/profile" exact={true} component={ProfilePage}/>
                                <Route path="/landing" exact={true} component={LandingPage}/>
                                {/*<Route path="/issues" exact={true} component={Issues}/>*/}
                                <Route path="/projects" exact={true} component={ProjectsTable}/>
                                <Route path="/create-project" exact={true} component={CreateProject}/>
                                <Route path="/projects/:projectId" exact={true} component={ProjectDetails}/>
                                {/*<Route path="/projects/:projectId" exact={true} component={IssuesTable}/>*/}
                                <Route path={["users/:userId/issues", "/issues"]} exact={true} component={IssuesPage}/>
                                <Route path="/projects/:projectId/create-issue" exact={true} component={CreateIssue}/>
                                <Route path={["/issues/:issueId", "/projects/:projectId/issues/:issueId"]}
                                       exact={true} component={IssueDetails}/>
                                <Route path={["/users/:userId", "/projects/:projectId/users/:userId"]}
                                       exact={true} component={UserProfile}/>
                            </div>
                        </div>
                    </div>
                </PersistGate>
            </BrowserRouter>
        </Provider>
      </div>
  );
}

export default App;
