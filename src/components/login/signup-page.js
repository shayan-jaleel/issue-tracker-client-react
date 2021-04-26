import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {connect} from "react-redux";
const SignupPage = ({userLoggedIn, register}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    return (
        <div className="container mt-3">
            {userLoggedIn ? <Redirect to="/profile"/> : null}
            <h1>
                Register
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
                <label htmlFor="confirmPassword"
                       className="col-sm-2 col-form-label">
                    Confirm Password
                </label>
                <div className="col-sm-10">
                    <input type="password"
                           className="form-control"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           id="confirmPassword"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="confirmPassword"
                       className="col-sm-2 col-form-label">
                </label>

                <div className="col-sm-10">
                    <a className="btn btn-primary btn-block"
                       onClick={() => register(username, password, confirmPassword)}>
                        Sign Up
                    </a>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword"
                       className="col-sm-2 col-form-label">
                </label>
                <div className="col-sm-10">
                    <div className="d-flex justify-content-between">
                        <Link to="/login">
                            Login
                        </Link>
                        <a className="cancel-button" href="#">
                            Cancel
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

const dtpm = (dispatch) => ({
    register: (username, password) => {
        const user = {
            username,
            password
        }
        sessionService.register(user).then(actualUser => dispatch({
            type: SET_CURRENT_USER,
            userLoggedIn: actualUser
        }))
    }
})


export default connect(stpm, dtpm)(SignupPage)