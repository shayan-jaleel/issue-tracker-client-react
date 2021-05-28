import {Link, useHistory, useParams} from "react-router-dom";
import React from "react";
import {useMediaQuery} from "react-responsive";

const UsersRow = ({user}) => {
        const {projectId} = useParams()
        const history = useHistory()
        const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
        return (
        <tr key={user.userId}>
                <td>
                        {user.userId}
                </td>
                <td>
                        <Link to={`/projects/${projectId}/users/${user.userId}`}>{user.username}</Link>
                </td>
                <td className="d-none d-sm-table-cell">
                        {user.firstname}
                </td>
                <td className="d-none d-sm-table-cell">
                        {user.lastname}
                </td>
                <td className={`btn btn-primary btn-sm mr-3 ${(isMobile? "" : "float-right")}`}
                    style={{backgroundColor:"#1261a0"}}
                    onClick={() => {
                            history.push(`/projects/${projectId}/users/${user.userId}`)
                    }}
                >View</td>
        </tr>
        )
}

export default UsersRow