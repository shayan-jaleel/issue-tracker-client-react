import {Link, useHistory, useParams} from "react-router-dom";
import React from "react";

const UsersRow = ({user}) => {
        const {projectId} = useParams()
        const history = useHistory()
        return (
        <tr key={user.userId}>
                <td>
                        {user.userId}
                </td>
                <td>
                        <Link to={`/projects/${projectId}/users/${user.userId}`}>{user.username}</Link>
                </td>
                <td>
                    {user.firstname}
                </td>
                <td>
                    {user.lastname}
                </td>
                <td className="btn btn-primary btn-sm float-right mr-3"
                    style={{backgroundColor:"#1261a0"}}
                    onClick={() => {
                            history.push(`/projects/${projectId}/users/${user.userId}`)
                    }}
                >View</td>
        </tr>
        )
}

export default UsersRow