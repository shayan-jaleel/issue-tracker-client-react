import userService from "../../services/user-service";
import {useEffect, useState} from "react";

//_id will need to be changed when backend is moved to custom server
const ManageUsers = () => {
    useEffect(() => {
        userService.findAllUsers().then((users) => setUsers(users))
    }, [])
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    return <>
        <table className="table">
            <thead>
            <tr>
                <th>Username</th>
                {/*<th>Password</th>*/}
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>&nbsp;</th>
            </tr>
            <tr>
                <td><input className="form-control"
                           placeholder="Username"
                           onChange={(e) => setUsername(e.target.value)}
                           value={username}/></td>
                {/*<td><input className="form-control"*/}
                {/*           type="password"*/}
                {/*           placeholder="Password"/></td>*/}
                <td><input className="form-control"
                           placeholder="First Name"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}/></td>
                <td><input className="form-control"
                           placeholder="Last Name"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}/></td>
                <td>
                    <select className="form-control"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}>
                        <option value="ADMIN">Administrator</option>
                        <option value="DEVELOPER">Developer</option>
                        <option value="MANAGER">Project Manager</option>
                    </select></td>
                {/*<td><span className="pull-right" style="white-space: nowrap">*/}
                <td>
                    <span className="pull-right fa-button-pull-fix">
                    <i className="fa fa-search wbdv-update-icon btn btn-dark"/>
                    <i className="fa fa-plus wbdv-create-icon btn btn-dark"
                       // onClick={() => createUser({
                       //     username: username,
                       //     firstname: firstname,
                       //     lastname: lastname,
                       //     role: role
                       // })}/>
                        />
                    <i className="fa fa-check wbdv-update-icon btn btn-dark"/>
                    </span>
                </td>
            </tr>
            </thead>
            <tbody>
                {
                    users.map((user) =>
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        {/*<td></td>*/}
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role.name}</td>
                        <td>
                        <span className="pull-right fa-button-pull-fix">
                        <i className="fa fa-times-circle wbdv-delete btn btn-dark"
                           // onClick={() => deleteUser(user._id)}/>
                            />
                        <i className="fa fa-edit wbdv-select btn btn-dark"/>
                        </span>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
}

    // const stpm = (state) => ({users: state.userReducer.users})
    // const dtpm = (dispatch) => ({
    //     findUsers: () => userService.findAllUsers()
    //         .then(users =>
    //             dispatch({
    //                 type: FIND_ALL_USERS,
    //                 users: users
    //         })),
    //     createUser: (user) => userService.createUser(user)
    //         .then(user =>dispatch(
    //             {
    //                 type: CREATE_USER,
    //                 user: user
    //             }
    //         )),
    //     deleteUser: (userId) => userService.deleteUser(userId)
    //         .then(status => dispatch(
    //             {
    //                 type: DELETE_USER,
    //                 userId: userId
    //             }
    //         ))
    //     })


export default ManageUsers