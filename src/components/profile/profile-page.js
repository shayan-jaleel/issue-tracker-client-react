import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import React, {useEffect, useState} from "react";
import userService from "../../services/user-service";
import {SET_SIDEBAR_ACTIVE_MY_PROFILE} from "../../reducers/sidebar-reducer";

const ProfilePage = ({
     userLoggedIn,
     setUserLoggedOut,
     updateUserLoggedIn,
     setSidebarActive
 }) => {
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [role, setRole] = useState("DEVELOPER")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")

    useEffect(() => {
        if(userLoggedIn) {
            setSidebarActive()
            setUsername(userLoggedIn.username ? userLoggedIn.username : '')
            setFirstname(userLoggedIn.firstname ? userLoggedIn.firstname : '')
            setLastname(userLoggedIn.lastname ? userLoggedIn.lastname : '')
            setRole(userLoggedIn.role ? userLoggedIn.role.name : 'DEVELOPER')
            setPassword(userLoggedIn.password ? userLoggedIn.password : '')
            setEmail(userLoggedIn.email ? userLoggedIn.email : '')
        }
    }, [userLoggedIn])


    const validate = () => {
        let isValid = true
        setEmailError('')
        setPasswordError('')
        if(email && email !== '' && !email.includes('@')) {
            isValid = false
            setEmailError("Please enter a valid email.")
        }
        if(password.length < 5) {
            isValid = false
            setPasswordError('Password must have a length > 4.')
        }
        return isValid
    }
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            {/*{userLoggedIn && JSON.stringify(userLoggedIn)}*/}
            <div className="container ml-n3">
                <h3>
                    Profile
                </h3>

                <div className="mt-4 row">
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
                <div className="mt-3 row">
                    <label htmlFor="password"
                           className="col-sm-2 col-form-label">
                        Password
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               placeholder="Must be at least 5 characters long"
                               className="form-control"
                               id="password"
                               onChange={(e) => setPassword(e.target.value)}
                               value={password}/>
                    </div>
                </div>
                {
                    passwordError &&
                    <div className="row mt-2">
                        <div className="col-sm-2"/>
                        <div className="col-sm-10" style={{color: "red"}}>
                            {passwordError}
                        </div>
                    </div>
                }

                <div className="mt-3 row">
                    <label htmlFor="firstname"
                           className="col-sm-2 col-form-label">
                        Firstname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="firstname"
                               placeholder="Bob"
                               onChange={(e) => setFirstname(e.target.value)}
                               value={firstname}/>
                    </div>
                </div>

                <div className="mt-3 row">
                    <label htmlFor="lastname"
                           className="col-sm-2 col-form-label">
                        Lastname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               placeholder="Moore"
                               className="form-control"
                               id="lastname"
                               onChange={(e) => setLastname(e.target.value)}
                               value={lastname}/>
                    </div>
                </div>

                <div className="mt-3 row">
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
                               placeholder="bob@ontrack.com"
                               id="email"/>
                    </div>
                </div>
                {
                    emailError &&
                    <div className="row mt-2">
                        <div className="col-sm-2"/>
                        <div className="col-sm-10" style={{color: "red"}}>
                            {emailError}
                        </div>
                    </div>
                }

                <div className="mt-3 row">
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

                <div className="mt-3 row">
                    <label htmlFor="dob"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <button className="btn btn-success btn-block"
                                onClick={() => {
                                    if(validate()) {
                                        console.log('validated')
                                        updateUser(userLoggedIn, password, firstname,
                                            lastname, email, role, updateUserLoggedIn)
                                    }}}>
                            Update
                        </button>
                    </div>
                </div>

                <div className="mt-3 row">
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

const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn,
    sidebarActive: state.sidebar.sidebarActive})

const dtpm = (dispatch) => ({
    setUserLoggedOut: () => sessionService.logout()
        .then(user =>
            dispatch({
                type: SET_CURRENT_USER,
                userLoggedIn: null
            })),
    updateUserLoggedIn: (user) =>
        dispatch({
            type: SET_CURRENT_USER,
            userLoggedIn: user
    }),
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_MY_PROFILE
        })
})

const updateUser = (userLoggedIn, password, firstname, lastname, email, role, updateUserLoggedIn) => {
    const userId = userLoggedIn.id
    const newUser = {...userLoggedIn, password: password, firstname: firstname, lastname: lastname, email: email}
    // console.log(JSON.stringify(newUser))
    userService.updateUser(userId, newUser).then(updatedUser => {
        updateUserLoggedIn(updatedUser)
    })
}

export default connect(stpm, dtpm)(ProfilePage)