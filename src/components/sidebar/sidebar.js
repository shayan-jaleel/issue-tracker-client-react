import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Sidebar = ({userLoggedIn}) =>
    <div>
        <h4>
            <ul className="list-group">
                {userLoggedIn && userLoggedIn.role.name === 'ADMIN' &&
                <li className="list-group-item font-weight-bold"><Link to="/user-roles">Manage Users</Link></li>
                }
                <li className="list-group-item font-weight-bold"><Link to="/projects">My Projects</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/issues">My Issues</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/login">Login</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/profile">My Profile</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/landing">Landing Page</Link></li>
            </ul>
        </h4>
    </div>


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(Sidebar)