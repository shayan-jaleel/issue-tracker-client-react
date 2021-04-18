import {Link, useParams} from "react-router-dom";

const UsersRow = ({user}) => {
        const {projectId} = useParams()
        return (
        <tr>
        <td>
                <Link to={`/projects/${projectId}/users/${user.id}`}>{user.username}</Link>
        </td>
        <td>
            {user.firstname}
        </td>
        <td>
            {user.lastname}
        </td>
        <td>
            {user.role.name}
        </td>
        <td>
        </td>
        </tr>
        )
}

export default UsersRow