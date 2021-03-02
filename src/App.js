import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/home-page'
import LoginPage from "./components/login/login-page";
import Issues from "./components/issues/issues-page";
import CreateIssue from "./components/issues/create-issue"

function App() {
  return (
    <BrowserRouter>
        <div className="container-fluid">
            <Route path="/" exact={true}  component={Home}/>
            <Route path="/login" exact={true} component={LoginPage}/>
            <Route path="/issues" exact={true} component={Issues}/>
            <Route path="/issues/create-issue" exact={true} component={CreateIssue}/>
        </div>
    </BrowserRouter>

  );
}

export default App;
