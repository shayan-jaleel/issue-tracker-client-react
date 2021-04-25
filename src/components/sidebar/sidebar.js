import {Link} from "react-router-dom";

const Sidebar = () =>
    <div>
        <h4>
            <ul className="list-group">
                <li className="list-group-item font-weight-bold"><Link to="/user-roles">Manage Users</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/projects">My Projects</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/issues">My Issues</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/login">Login</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/profile">My Profile</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/landing">Landing Page</Link></li>
            </ul>
        </h4>
    </div>

export default Sidebar