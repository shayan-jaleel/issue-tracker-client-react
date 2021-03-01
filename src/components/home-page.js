import {Link} from "react-router-dom";
import LoginPage from "./login/login-page";

export default () =>
    <>
        <h1>Home</h1>
        <div className="list-group">
            <Link to="./login" className="list-group-item">
                Login
            </Link>
            <Link to="#" className="list-group-item">
                Page 2
            </Link>
            <Link to="#" className="list-group-item">
                Page 3
            </Link>
        </div>
    </>