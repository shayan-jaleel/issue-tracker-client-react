import React, {useEffect, useState} from "react";
import userService from "../../services/user-service";
import {Link, useParams} from "react-router-dom";

//TODO: make the assignedUsers and allUsers lists mutually exclusive
const ManageProjectUsers = () => {
    const [assignedUsers, setAssignedUsers] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const [selectedUser, setSelectedUser] = useState(undefined)
    const [rerender, setRerender] = useState(false)
    const {projectId} = useParams()
    useEffect(() => {
        userService.findUsersForProject(projectId).then((users) => {
            setAssignedUsers(users)
        })
        userService.findAllUsers().then((users) => {
            // setAllUsers(users.filter((user) => user.hasOwnProperty('id') && user.id))
            setAllUsers(users)
        })
    }, [rerender])
    return(
    <div className="mr-3 container-fluid mb-4">
        <h4 style={{color: "navy"}} className="font-weight-bold">Users For Project
            <span style={{color: "#1261a0"}}> {projectId}</span>
        </h4>
        <div className="mt-3">
            <select onChange={(e) => setSelectedUser(e.target.value)}
                    value={selectedUser? selectedUser: 'no_selection'}
                    className="form-control">
                {
                    allUsers && allUsers.map((u) => <option
                        value={u.id} key={u.id}>{u.username}</option>)
                }
                <option value= 'no_selection'>Select User</option>
            </select>
        </div>
        <button className="btn btn-success btn-block mt-2 mb-2" style={{background: "#1261a0"}}
            onClick={() => {
                userService.addUserToProject(projectId, selectedUser)
                    .then(r => {
                        setAllUsers(allUsers.filter((u) => u.id !== selectedUser))
                        setRerender(!rerender)
                    })
                // setRerender(!rerender)
            }} disabled={!selectedUser || selectedUser === 'no_selection'}>
            Add User To Project
        </button>
        <table className="table table-striped">
            <thead style={{color: "navy"}}>
            <tr>
                <th className="">Username</th>
                <th className="d-none d-sm-table-cell">Firstname</th>
                <th className="d-none d-sm-table-cell">Lastname</th>
                <th className="d-none d-sm-table-cell">Role</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {
                assignedUsers && assignedUsers.map(assignedUser =>
                    <tr key={assignedUser.id}>
                        <td>
                            <Link to={`/projects/${projectId}/users/${assignedUser.id}`}>{assignedUser.username}</Link>
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {assignedUser.firstname}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {assignedUser.lastname}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {assignedUser.role.name}
                        </td>
                        <td>
                            <i className="btn fas fa-times-circle"
                               onClick={() => {
                                   userService.removeUserFromProject(projectId, assignedUser.id)
                                       .then(r => setRerender(!rerender))
                               }
                               }/>
                        </td>
                    </tr>)
            }
            </tbody>
        </table>
        <div className="" >
            <Link to={`/projects/${projectId}`} className="btn btn-danger btn-block" style={{background: "#ba2f2f"}}>
                Cancel
            </Link>
        </div>
    </div>
    )
}

export default ManageProjectUsers