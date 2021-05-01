import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/home-page'
import LoginPage from "./components/login/login-page";
import Issues from "./components/issues/issues-page";
import CreateIssue from "./components/issues/create-issue"
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import {Provider} from "react-redux";
import ManageUsers from "./components/users/manage-users"
import ProjectsTable from "./components/projects/projects-table";
import ProjectDetails from "./components/projects/project-details";
import IssuesTable from "./components/issues/issues-table";
import IssueDetails from "./components/issues/issue-details";
import IssuesPage from "./components/issues/issues-page";
import SignupPage from "./components/login/signup-page";
import ProfilePage from "./components/profile/profile-page";
import LandingPage from "./components/home/landing-page";
import UserProfile from "./components/users/user-profile";
import {PersistGate} from "redux-persist/integration/react"
import {store, persistor} from "./redux/store";
import CreateProject from "./components/projects/create-project";
import ManageProjectUsers from "./components/users/manage-project-users";
import './components/sidebar/custom-sidebar-style.scss'

function App() {
  return (
      <div className="custom-flex-parent">
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate persistor={persistor}>
                    <Navbar/>
                        <div className="layout-hello">
                            <Sidebar/>
                            <div className="content">
                            <Route path="/" exact={true} component={LandingPage}/>
                            <Route path="/user-roles" exact={true} component={ManageUsers}/>
                            <Route path="/login" exact={true} component={LoginPage}/>
                            <Route path="/signup" exact={true} component={SignupPage}/>
                            <Route path="/profile" exact={true} component={ProfilePage}/>
                            <Route path="/landing" exact={true} component={LandingPage}/>
                            {/*<Route path="/issues" exact={true} component={Issues}/>*/}
                            <Route path="/projects" exact={true} component={ProjectsTable}/>
                            <Route path="/create-project" exact={true} component={CreateProject}/>
                            <Route path="/projects/:projectId" exact={true} component={ProjectDetails}/>
                            <Route path="/projects/:projectId/manage-project-users" exact={true} component={ManageProjectUsers}/>
                            {/*<Route path="/projects/:projectId" exact={true} component={IssuesTable}/>*/}
                            <Route path={["users/:userId/issues", "/issues"]} exact={true} component={IssuesPage}/>
                            <Route path="/projects/:projectId/create-issue" exact={true} component={CreateIssue}/>
                            <Route path={["/issues/:issueId", "/projects/:projectId/issues/:issueId"]}
                                   exact={true} component={IssueDetails}/>
                            <Route path={["/users/:userId", "/projects/:projectId/users/:userId"]}
                                   exact={true} component={UserProfile}/>
                            </div>
                        </div>
                </PersistGate>
            </BrowserRouter>
        </Provider>
      </div>
  );
}

export default App;
