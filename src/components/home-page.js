import {Link} from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

export default () =>
    <>
        <h1>Home</h1>
        <div className="list-group">
            {/*<Sidebar/>*/}
            <Link to="./login" className="list-group-item">
                Login
            </Link>
            <Link to="./issues" className="list-group-item">
                Issues
            </Link>
            <Link to="./issues/create-issue" className="list-group-item">
                Create Issue
            </Link>
            <Link to="./user-roles" className="list-group-item">
                Manage User Roles
            </Link>
            <Link to="./projects" className="list-group-item">
                My Projects
            </Link>
        </div>
    </>