import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {
    CgProfile,
    FaUsersCog, GiFiles,
    IoChevronBackCircleSharp,
    IoChevronForwardCircleSharp, IoHome,
    VscFileSubmodule
} from "react-icons/all";
import {useState} from "react";
import './custom-sidebar-style.scss'
import './custom-sidebar-extra.scss'
import {
    SET_SIDEBAR_ACTIVE_HOME,
    SET_SIDEBAR_ACTIVE_MANAGE_USERS,
    SET_SIDEBAR_ACTIVE_MY_ISSUES,
    SET_SIDEBAR_ACTIVE_MY_PROFILE,
    SET_SIDEBAR_ACTIVE_MY_PROJECTS
} from "../../reducers/sidebar-reducer";
import {useMediaQuery} from 'react-responsive';

const Sidebar = ({sidebarActive, userLoggedIn}) => {
    const [collapsed, setCollapsed] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

    return (
            <aside style={{zIndex: 10}}>
                <ProSidebar collapsed={isMobile? true: collapsed} width="250px" className="custom-sidebar">
                    <SidebarHeader>
                         <div className="m-2 ml-4 custom-button" onClick={() => setCollapsed(!collapsed)}>
                             {collapsed && <IoChevronForwardCircleSharp size="2em"/>}
                             {!collapsed && <IoChevronBackCircleSharp size="2em" className="custom-icon"/>}
                         </div>
                    </SidebarHeader>
                    <Menu iconShape="circle">
                        <MenuItem icon={<IoHome size="2em" color="white"/>}
                                  active={sidebarActive === SET_SIDEBAR_ACTIVE_HOME}>
                            <span className="custom-menu-item font-weight-bold">Home<Link to="/"/></span>
                        </MenuItem>
                        {
                        userLoggedIn && (userLoggedIn.role.name === 'ADMIN') &&
                        <MenuItem icon={<FaUsersCog size="2em" color="white"/>}
                                  active={sidebarActive === SET_SIDEBAR_ACTIVE_MANAGE_USERS}>
                            <span className="custom-menu-item font-weight-bold">Manage Users<Link
                                to="/user-roles"/></span>
                        </MenuItem>
                        }
                        <MenuItem icon={<VscFileSubmodule size="2em" color="white"/>}
                                  active={sidebarActive === SET_SIDEBAR_ACTIVE_MY_PROJECTS}>
                            <span className="custom-menu-item font-weight-bold">My Projects<Link to="/projects"/></span>
                        </MenuItem>
                        <MenuItem icon={<GiFiles size="2em" color="white"/>}
                                  active={sidebarActive === SET_SIDEBAR_ACTIVE_MY_ISSUES}>
                            <span className="custom-menu-item font-weight-bold">My Issues<Link to="/issues"/></span>
                        </MenuItem>
                        <MenuItem icon={<CgProfile size="2em" color="white"/>}
                                  active={sidebarActive === SET_SIDEBAR_ACTIVE_MY_PROFILE}>
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


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn,
    sidebarActive: state.sidebar.sidebarActive})

export default connect(stpm)(Sidebar)