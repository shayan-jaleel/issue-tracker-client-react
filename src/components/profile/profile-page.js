import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {useEffect, useState} from "react";
import userService from "../../services/user-service";

const ProfilePage = ({
     userLoggedIn,
     setUserLoggedOut
 }) => {
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [role, setRole] = useState("DEVELOPER")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if(userLoggedIn) {
            setUsername(userLoggedIn.username ? userLoggedIn.username : '')
            setFirstname(userLoggedIn.firstname ? userLoggedIn.firstname : '')
            setLastname(userLoggedIn.lastname ? userLoggedIn.lastname : '')
            setRole(userLoggedIn.role ? userLoggedIn.role.name : 'DEVELOPER')
            setPassword(userLoggedIn.password ? userLoggedIn.password : '')
            setEmail(userLoggedIn.email ? userLoggedIn.email : '')
        }
    }, [userLoggedIn])
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="container mt-3">
                <h1>
                    Profile for:
                </h1>
                {userLoggedIn && JSON.stringify(userLoggedIn)}
                <div className="alert alert-success"
                     role="alert">
                    Changes saved!
                </div>

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
                               value={username}/>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label htmlFor="password"
                           className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="password"
                               onChange={(e) => setPassword(e.target.value)}
                               value={password}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="firstname"
                           className="col-sm-2 col-form-label">
                        Firstname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="firstname"
                               onChange={(e) => setFirstname(e.target.value)}
                               value={firstname}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="lastname"
                           className="col-sm-2 col-form-label">
                        Lastname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="lastname"
                               onChange={(e) => setLastname(e.target.value)}
                               value={lastname}/>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email"
                           className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input type="email"
                               className="form-control"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               title="Please enter a valid email"
                               placeholder={email}
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
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                disabled={true}>
                            <option>Admin</option>
                            <option>Developer</option>
                            <option>Manager</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="dob"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <button className="btn btn-success btn-block"
                                onClick={() => updateUser(userLoggedIn, password, firstname, lastname, email, role)}>
                            Update
                        </button>
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="dob"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                <span className="btn btn-danger btn-block"
                      onClick={setUserLoggedOut}>
                    Logout
                </span>
                    </div>
                </div>
            </div>
        </>
    )
}

const stpm = (state) => ({userLoggedIn: state.sessionReducer.userLoggedIn})

const dtpm = (dispatch) => ({
    setUserLoggedOut: () => sessionService.logout()
        .then(user =>
            dispatch({
                type: SET_CURRENT_USER,
                userLoggedIn: null
            }))
})

const updateUser = (userLoggedIn, password, firstname, lastname, email, role) => {
    const userId = userLoggedIn.id
    const newUser = {...userLoggedIn, password: password, firstname: firstname, lastname: lastname, email: email}
    console.log(JSON.stringify(newUser))
    userService.updateUser(userId, newUser).then(r => console.log(r))
}

export default connect(stpm, dtpm)(ProfilePage)