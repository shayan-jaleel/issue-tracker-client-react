import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    CgProfile,
    FaGem,
    FaHeart,
    FaUsersCog, GiFiles,
    IoChevronBackCircleSharp,
    IoChevronForwardCircleSharp,
    VscFileSubmodule
} from "react-icons/all";
import {useState} from "react";
import './custom-sidebar-style.css'
import './custom-sidebar-extra.scss'

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
            <aside>
                <ProSidebar collapsed={collapsed} width="250px" className="custom-sidebar">
                    <SidebarHeader>
                         <div className="m-2 ml-4 custom-button" onClick={() => setCollapsed(!collapsed)}>
                             {collapsed && <IoChevronForwardCircleSharp size="2em"/>}
                             {!collapsed && <IoChevronBackCircleSharp size="2em" className="custom-icon"/>}
                         </div>
                    </SidebarHeader>
                    <Menu iconShape="circle">
                        <MenuItem icon={<FaUsersCog size="2em" color="white"/>} active={true}>
                            <span className="custom-menu-item font-weight-bold">Manage Users<Link to="/user-roles"/></span>
                        </MenuItem>
                        <MenuItem icon={<VscFileSubmodule size="2em" color="white"/>}>
                            <span className="custom-menu-item font-weight-bold">My Projects<Link to="/projects"/></span>
                        </MenuItem>
                        <MenuItem icon={<GiFiles size="2em" color="white"/>}>
                            <span className="custom-menu-item font-weight-bold">My Issues<Link to="/issues"/></span>
                        </MenuItem>
                        <MenuItem icon={<CgProfile size="2em" color="white"/>}>
                            <span className="custom-menu-item font-weight-bold">Profile<Link to="/profile"/></span>
                        </MenuItem>
                    </Menu>
                </ProSidebar>
            </aside>
    );
}

// const Sidebar = ({userLoggedIn}) => {
//     const [isCollapsed, setIsCollapsed] = useState(false)
//     return (
//         <div className="layout">
//         <ProSidebar collapsed={isCollapsed}>
//         <SidebarHeader>
//             <div className="mt-3" onClick={() => setIsCollapsed(!isCollapsed)}>
//                 Header
//             </div>
//         </SidebarHeader>
//         <Menu iconShape="square">
//             <MenuItem icon={<FaGem/>}>Dashboard</MenuItem>
//             <SubMenu title="Components" icon={<FaHeart/>}>
//                 <MenuItem>Component 1</MenuItem>
//                 <MenuItem>Component 2</MenuItem>
//             </SubMenu>
//         </Menu>
//         </ProSidebar>
//             <div className="content"><div> this is a heading</div></div>
//         </div>
//     );
// }
    // <div>
    //     <h4>
    //         <span className="d-none d-md-block">
    //         {/*<span className="d-none d-md-block">*/}
    //         <ul className="list-group">
    //             {userLoggedIn && userLoggedIn.role.name === 'ADMIN' &&
    //             <li className="list-group-item font-weight-bold"><Link to="/user-roles" className="red-link">Manage Users</Link></li>
    //             }
    //             <li className="list-group-item font-weight-bold"><Link to="/projects" className="red-link">My Projects</Link></li>
    //             <li className="list-group-item font-weight-bold"><Link to="/issues" className="red-link">My Issues</Link></li>
    //             <li className="list-group-item font-weight-bold"><Link to="/login" className="red-link">Login</Link></li>
    //             <li className="list-group-item font-weight-bold"><Link to="/profile" className="red-link">My Profile</Link></li>
    //             <li className="list-group-item font-weight-bold"><Link to="/landing" className="red-link">Landing Page</Link></li>
    //         </ul>
    //         </span>
    //     </h4>
    // </div>


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(Sidebar)