import userService from "../../services/user-service";
import React, {useEffect, useState} from "react";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {SET_SIDEBAR_ACTIVE_MANAGE_USERS, SET_SIDEBAR_ACTIVE_MY_PROFILE} from "../../reducers/sidebar-reducer";
import {connect} from "react-redux";
import {AiFillFolderAdd, TiUserAdd, TiUserDelete} from "react-icons/all";

//_id will need to be changed when backend is moved to custom server
const ManageUsers = ({setSidebarActive}) => {
    useEffect(() => {
        setSidebarActive()
        userService.findAllUsers().then((users) => setUsers(users))
    }, [])
    const [users, setUsers] = useState([])
    const [editingUser, setEditingUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('DEVELOPER')
    const clearScreen = () => {
        setEditingUser(null)
        setUsername('')
        setEmail('')
        setPassword('')
        setRole('DEVELOPER')
    }
    return <div className="container-fluid">
        <h4 className="font-weight-bold mb-3" style={{color: "navy"}}>Add, Modify and Remove Users</h4>
        <table className="table">
            <thead className="" style={{color: "navy"}}>
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
                           placeholder="Email"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}/></td>
                <td><input className="form-control"
                           placeholder="Password"
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
                    <i className="fa fa-search btn btn-dark pl-3 pr-3 ml-n1" style={{background: "#1261a0"}}/>
                        {!editingUser && <i className="fa ml-1 fa-plus btn btn-dark pl-3 pr-3"style={{background: "#1261a0"}}
                            onClick={() => userService.createUserForRole({
                                username,
                                email,
                                password
                            }, roleToId(role)).then((createdUser) => {
                                setUsers(
                                    [...users, createdUser])
                            })}
                        />}
                        {
                            editingUser && <i className="fa ml-1 fa-check btn btn-dark pl-3 pr-3" style={{background: "#1261a0"}}
                           onClick={() => {
                               const newUser = {
                                   id: editingUser.id,
                                   username:username,
                                   email:email,
                                   password:password
                               }
                               userService.updateUserForRole(editingUser.id,
                                   roleToId(role),
                                   newUser).then((updatedUser) =>
                                   setUsers(users.map((user) => {
                                           if(user.id === editingUser.id){
                                               return updatedUser
                                           } else return user
                               })))
                               setEditingUser(null)
                               setUsername('')
                               setEmail('')
                               setPassword('')
                               setRole('DEVELOPER')
                           }}/>
                        }
                        {
                            editingUser && <i className="fa ml-1 fa-backspace btn btn-dark" style={{background: "#ba2f2f"}}
                                              onClick={() => {
                                                  setEditingUser(null)
                                                  setUsername('')
                                                  setEmail('')
                                                  setPassword('')
                                                  setRole('DEVELOPER')
                                              }}/>
                        }
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
                        <i className="fa fa-user-minus btn btn-dark" style={{background: "#ba2f2f"}}
                           onClick={() => userService.deleteUser(user.id).then(() => setUsers(
                               users.filter((u) => user.id !== u.id)
                           ))}/>
                        <i className="fa fa-edit btn btn-dark ml-1" style={{background: "#1261a0"}}
                           onClick={() => {
                               setEditingUser(user)
                               setEmail(user.email)
                               setPassword(user.password)
                               setUsername(user.username)
                               setRole(user.role.name)
                           }}/>
                        </span>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
}

export const roleToId = role => {
    if(role === 'ADMIN') return 1
    else if(role === 'MANAGER') return 3
    else return 2
}
export const roleIdToObject = role => {
    if(role === 'ADMIN') return {
        id: 1,
        name: 'ADMIN'
    }
    else if(role === 'MANAGER') return {
        id: 3,
        name: 'MANAGER'
    }
    else return {
        id: 2,
        name: 'DEVELOPER'
    }
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn,
    sidebarActive: state.sidebar.sidebarActive})

const dtpm = (dispatch) => ({
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_MANAGE_USERS
        })
})
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


export default connect(stpm, dtpm)(ManageUsers);