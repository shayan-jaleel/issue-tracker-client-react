import {Link} from "react-router-dom";

export default () =>
    <>
        <h1>Home</h1>
        <div className="list-group">
            <Link to="./login" className="list-group-item">
                Login
            </Link>
            <Link to="./issues" className="list-group-item">
                Issues
            </Link>
            <Link to="#" className="list-group-item">
                Page 3
            </Link>
        </div>
    </>