import {Link} from "react-router-dom";

const Sidebar = () =>
    <div>
        <h4>
            <ul className="list-group">
                <li className="list-group-item"><Link to="/user-roles">Manage Roles</Link></li>
                <li className="list-group-item"><Link to="/projects"  >My Projects</Link></li>
                <li className="list-group-item">My Tickets</li>
                <li className="list-group-item">My Profile</li>
            </ul>
        </h4>
    </div>

export default Sidebar