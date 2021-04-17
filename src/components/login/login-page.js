import React, {useState} from "react"
import {Link} from "react-router-dom";
import sessionService from "../../services/session-service";
import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {connect} from "react-redux";

const LoginPage = ({
                       userLoggedIn,
                       setUserLoggedIn
                   }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="container mt-3">
        <h1>
            Sign In
        </h1>

        <div className="mb-3 row mt-3">
            <label htmlFor="username"
                   className="col-sm-2 col-form-label">
                Username
            </label>
            <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}
                       id="username"/>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
                Password
            </label>
            <div className="col-sm-10">
                <input type="password"
                       className="form-control"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       id="inputPassword"/>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
            </label>

            <div className="col-sm-10">
                <a className="btn btn-primary btn-block"
                    onClick={() => login(username, password, setUserLoggedIn)}>
                    Sign In
                </a>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
            </label>
            <div className="col-sm-10">
                <div className="d-flex justify-content-between">
                    <Link to="/signup">
                        Sign Up
                    </Link>
                    <a href="#">
                        Forgot Password
                    </a>
                    <a className="cancel-button" href="#">
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    </div>
    )
}


const stpm = (state) => ({userLoggedIn: state.sessionReducer.userLoggedIn})
const dtpm = (dispatch) => ({
    setUserLoggedIn: (user) => sessionService.login(user)
        .then(user =>
            dispatch({
                type: SET_CURRENT_USER,
                userLoggedIn: user
            }))
})

const login = (username, password, setUserLoggedIn) => {
    console.log(username)
    console.log(password)
    const user = {
        username,
        password
    }
    setUserLoggedIn(user)
    // sessionService.login(user).then((returnedUser) => console.log(returnedUser))
}

export default connect(stpm, dtpm)(LoginPage)