import UsersRow from "./users-row";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {AiFillFileAdd, FaUsersCog, GrUserManager, GrUserSettings} from "react-icons/all";
import React from "react";

const UsersTable = ({users, projectId, userLoggedIn}) => {
    const history = useHistory()
    return (
        <div className="mt-3">
        <table className="table table-striped">
            <thead>
            <tr>
                <th className="d-none d-sm-table-cell">User ID</th>
                <th className="d-none d-sm-table-cell">Username</th>
                <th className="d-none d-sm-table-cell">Firstname</th>
                <th className="d-none d-sm-table-cell">Lastname</th>
                <th>
                    {
                        userLoggedIn && (userLoggedIn.role.name === 'ADMIN' || userLoggedIn.role.name === 'MANAGER') &&
                        <div className="on-track-icon float-right pl-1 pr-1 pt-1"
                             style={{
                                 border: "1px solid navy", display: "flex",
                                 background: "#1261a0", borderRadius: 4
                             }}
                             onClick={() => history.push(`/projects/${projectId}/manage-project-users`)}>
                            <FaUsersCog className="mb-1 mr-1" color="white" size="2em"/>
                            <div className="mt-1 mr-1" style={{color: "white", whiteSpace: "nowrap"}}>Manage Users</div>
                        </div>
                    }
                </th>
            </tr>
            </thead>
            <tbody>
            {
                users && users.map((user, i) =>
                    <UsersRow
                        key={i}
                        user={user}/>)
            }
            </tbody>
        </table>
    </div>)
}

const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
export default connect(stpm)(UsersTable)