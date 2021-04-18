import {useEffect, useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import userService from "../../services/user-service";

const UserProfile = () => {
    const {userId} = useParams()
    const [user, setUser] = useState(null)
    useEffect(
        () => {
            userService.findUserById(userId).then((user) => {
                console.log(user)
                setUser(user)
            })
        }, []
    )
    return (
        <>
            <div className="container mt-3">
                <h1>
                    Profile for:
                </h1>
                {user && JSON.stringify(user)}

                <div className="mb-3 row">
                    <label
                        className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               readOnly
                               className="form-control"
                               id="username"
                               value={user && user.username ? user.username : ''}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="firstname"
                           className="col-sm-2 col-form-label">
                        Firstname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               readOnly
                               className="form-control"
                               id="firstname"
                               value={user && user.firstname ? user.firstname : ''}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lastname"
                           className="col-sm-2 col-form-label">
                        Lastname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               readOnly
                               className="form-control"
                               id="lastname"
                               value={user && user.lastname ? user.lastname : ''}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email"
                           className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input type="email"
                               readOnly
                               className="form-control"
                               value={user && user.email ? user.email : ''}
                               title="Please enter a valid email"
                               id="email"/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="role"
                           className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-10">
                        <select id="role" className="form-control"
                                value={user && user.role ? user.role.name : 'DEVELOPER'}
                                disabled={true}>
                            <option>Admin</option>
                            <option>Developer</option>
                            <option>Manager</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile