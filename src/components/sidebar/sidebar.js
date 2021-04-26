import {Link} from "react-router-dom";
import {connect} from "react-redux";

const Sidebar = ({userLoggedIn}) =>
    <div>
        <h4>
            <span className="d-none d-md-block">
            <ul className="list-group">
                {userLoggedIn && userLoggedIn.role.name === 'ADMIN' &&
                <li className="list-group-item font-weight-bold"><Link to="/user-roles" className="red-link">Manage Users</Link></li>
                }
                <li className="list-group-item font-weight-bold"><Link to="/projects" className="red-link">My Projects</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/issues" className="red-link">My Issues</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/login" className="red-link">Login</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/profile" className="red-link">My Profile</Link></li>
                <li className="list-group-item font-weight-bold"><Link to="/landing" className="red-link">Landing Page</Link></li>
            </ul>
            </span>
        </h4>
    </div>


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(Sidebar)