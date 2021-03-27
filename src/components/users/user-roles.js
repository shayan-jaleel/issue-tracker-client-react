import userService from "../../services/user-service";
import {CREATE_USER, FIND_ALL_USERS} from "../../reducers/user-reducer";
import {connect} from "react-redux";

const userRoles = ({
    users,
    findUsers,
    createUser,
    deleteUser,
    updateUser
}) =>
    <>
        <table className="table">
            <thead>
            <tr>
                <th>Username</th>
                {/*<th>Password</th>*/}
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>&nbsp;</th>
            </tr>
            <tr>
                <td><input className="form-control"
                           placeholder="Username"/></td>
                {/*<td><input className="form-control"*/}
                {/*           type="password"*/}
                {/*           placeholder="Password"/></td>*/}
                <td><input className="form-control"
                           placeholder="First Name"/></td>
                <td><input className="form-control"
                           placeholder="Last Name"/></td>
                <td>
                    <select className="form-control">
                        <option value="ADMIN">Administrator</option>
                        <option value="DEVELOPER">Developer</option>
                        <option value="MANAGER">Project Manager</option>
                    </select></td>
                {/*<td><span className="pull-right" style="white-space: nowrap">*/}
                <td>
                    <span className="pull-right fa-button-pull-fix">
                    <i className="fa fa-search wbdv-update-icon btn btn-dark"/>
                    <i className="fa fa-plus wbdv-create-icon btn btn-dark"/>
                    <i className="fa fa-check wbdv-update-icon btn btn-dark"/>
                    </span>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                {
                    users.map( (user) => <>
                        <td>{user.userName}</td>
                        {/*<td></td>*/}
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.role}</td>
                        <td>
                        <span className="pull-right fa-button-pull-fix">
                        <i className="fa fa-times-circle wbdv-delete btn btn-dark"/>
                        <i className="fa fa-edit wbdv-select btn btn-dark"/>
                        </span>
                        </td>
                    </>)
                }
            </tr>
            </tbody>
        </table>
    </>

    const stpm = (state) => ({users: state.userReducer.users})
    const dtpm = (dispatch) => ({
        findUsers: () => userService.findAllUsers()
            .then(users =>
                dispatch({
                    type: FIND_ALL_USERS,
                    users: users
            })),
        createUser: (user) => userService.createUser(user)
            .then(user =>
                dispatch({
                    type: CREATE_USER,
                    user: user
            }))
        })


export default connect(stpm, dtpm)(userRoles)