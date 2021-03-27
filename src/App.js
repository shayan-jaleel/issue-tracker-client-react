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
import userReducer from "./reducers/user-reducer";
import {Provider} from "react-redux";
import UserRoles from "./components/users/user-roles"

const reducer = combineReducers({
    userReducer: userReducer
})

const store = createStore(reducer)

function App() {
  return (
      <div>
        <Provider store={store}>
            <BrowserRouter>
                <Navbar/>
                {/*<div className="row"><Navbar/></div>*/}
                <div className="row">
                    <div className="col-2">
                        <Sidebar/>
                    </div>
                    <div className="col-8">
                        <div className="container-fluid">
                            <Route path="/" exact={true} component={Home}/>
                            <Route path="/user-roles" exact={true} component={UserRoles}/>
                            <Route path="/login" exact={true} component={LoginPage}/>
                            <Route path="/issues" exact={true} component={Issues}/>
                            <Route path="/issues/create-issue" exact={true} component={CreateIssue}/>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>
      </div>
  );
}

export default App;
