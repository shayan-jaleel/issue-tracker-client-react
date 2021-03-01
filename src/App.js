import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/home-page'
import LoginPage from "./components/login/login-page";
import Issues from "./components/issues/issues-page";

function App() {
  return (
    <BrowserRouter>
        <div className="container-fluid">
            <Route path="/" exact={true}  component={Home}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/issues" component={Issues}/>
        </div>
    </BrowserRouter>

  );
}

export default App;
