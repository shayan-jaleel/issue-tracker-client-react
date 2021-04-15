const UsersRow = ({user}) => (
    <tr>
        <td>
            {user.username}
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

export default UsersRow