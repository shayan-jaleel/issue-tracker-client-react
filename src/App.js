import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/home-page'
import LoginPage from "./components/login/login-page";
import Issues from "./components/issues/issues-page";
import CreateIssue from "./components/issues/create-issue"
import Sidebar from "./components/sidebar/sidebar";
import Navbar from "./components/navbar/navbar";
import {combineReducers} from "redux";

const reducer = combineReducers({

})

function App() {
  return (
      <div>
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
                        <Route path="/login" exact={true} component={LoginPage}/>
                        <Route path="/issues" exact={true} component={Issues}/>
                        <Route path="/issues/create-issue" exact={true} component={CreateIssue}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
