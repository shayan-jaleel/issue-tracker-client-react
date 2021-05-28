import UsersRow from "./users-row";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {AiFillFileAdd, FaUsersCog, GrUserManager, GrUserSettings} from "react-icons/all";
import React from "react";
import {useMediaQuery} from "react-responsive";

const UsersTable = ({users, projectId, userLoggedIn}) => {
    const history = useHistory()
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    return (
        <div className="mt-3">
        <table className="table table-striped border">
            <thead style={{color: "navy"}}>
            <tr>
                <th className="">ID</th>
                <th className="">Username</th>
                <th className="d-none d-sm-table-cell">Firstname</th>
                <th className="d-none d-sm-table-cell">Lastname</th>
                <th>
                    {
                        userLoggedIn && (userLoggedIn.role.name === 'ADMIN' || userLoggedIn.role.name === 'MANAGER') &&
                        <div className={`on-track-icon pl-1 pr-1 pt-1 ${(isMobile? 'ml-n2 w-50' : 'float-right')}`}
                             style={{
                                 border: "1px solid navy", display: "flex",
                                 background: "#1261a0", borderRadius: 4
                             }}
                             onClick={() => history.push(`/projects/${projectId}/manage-project-users`)}>
                            <FaUsersCog className="mb-1" color="white" size="2em"/>
                            {
                                !isMobile && (<div className="mt-1 ml-2 mr-1" style={{color: "white", whiteSpace: "nowrap"}}>Add/Remove
                                Users</div>)
                            }
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