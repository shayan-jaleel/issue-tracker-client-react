import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {connect} from "react-redux";
const SignupPage = ({userLoggedIn, register}) => {
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const validate = () => {
        let isValid = true
        setUsernameError('')
        setPasswordError('')
        setConfirmPasswordError('')
        if(username === '') {
            isValid = false
            setUsernameError("Username can't be empty.")
            console.log(usernameError)
        }
        if(password.length < 5){
            isValid = false
            setPasswordError("Password must have a length > 4.")
        }
        if(password !== confirmPassword){
            isValid = false
            setConfirmPasswordError("The two passwords don't match.")
        }
        return isValid
    }
    return (
        <div className="container ml-n3">
            {userLoggedIn ? <Redirect to="/profile"/> : null}
            <h3>
                Register
            </h3>

            <div className="row mt-4">
                <label htmlFor="username"
                       className="col-sm-2 col-form-label">
                    Username
                </label>
                <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           value={username}
                           placeholder="Can't be empty"
                           onChange={(e) => setUsername(e.target.value)}
                           id="username"/>
                </div>
            </div>
            {
                usernameError &&
                <div className="row mt-2">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10" style={{color: "red"}}>
                        {usernameError}
                    </div>
                </div>
            }
            <div className="mt-3 row">
                <label htmlFor="inputPassword"
                       className="col-sm-2 col-form-label">
                    Password
                </label>
                <div className="col-sm-10">
                    <input type="password"
                           placeholder="At least 5 characters long"
                           className="form-control"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           id="inputPassword"/>
                </div>
            </div>
            {
                passwordError &&
                <div className="row mt-2">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10" style={{color: "red"}}>
                        {passwordError}
                    </div>
                </div>
            }
            <div className="mt-3 row">
                <label htmlFor="confirmPassword"
                       className="col-sm-2 col-form-label">
                    Confirm Password
                </label>
                <div className="col-sm-10">
                    <input type="password"
                           placeholder="The two passwords must match"
                           className="form-control"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           id="confirmPassword"/>
                </div>
            </div>
            {
                confirmPasswordError &&
                <div className="row mt-2">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-10" style={{color: "red"}}>
                        {confirmPasswordError}
                    </div>
                </div>
            }
            <div className="mt-3 row">
                <label htmlFor="confirmPassword"
                       className="col-sm-2 col-form-label">
                </label>

                <div className="col-sm-10">
                    <a className="btn btn-primary btn-block"
                       onClick={() => {
                           if(validate()) {
                               console.log('validated')
                               register(username, password, confirmPassword)
                           }
                       }}>
                        Sign Up
                    </a>
                </div>
            </div>
            <div className="mt-3 row">
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
        sessionService.register(user)
            .then(actualUser => {
                console.log(actualUser)
                return dispatch({
                    type: SET_CURRENT_USER,
                    userLoggedIn: actualUser
                })
            }
        )
    }
})


export default connect(stpm, dtpm)(SignupPage)