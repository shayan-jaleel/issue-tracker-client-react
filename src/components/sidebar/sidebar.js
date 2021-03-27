import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

const Sidebar = () =>
    <div>
        <ul className="list-group">
            <h3 className="list-group-item">Manage Roles</h3>
            <h3 className="list-group-item">My Projects</h3>
            <h3 className="list-group-item">My Tickets</h3>
            <h3 className="list-group-item">My Profile</h3>
        </ul>
    </div>

export default Sidebar