import React, {useState} from "react"
import {Link, Redirect} from "react-router-dom";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {connect} from "react-redux";

const LoginPage = ({
                       userLoggedIn,
                       setUserLoggedIn
                   }) => {
    const [username, setUsername] = useState("")
    const [usernameError, setUsernameError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const validate = () => {
        let isValid = true
        setUsernameError('')
        setPasswordError('')
        if(username === '') {
            isValid = false
            setUsernameError("Username can't be empty.")
        }
        if(password === ''){
            isValid = false
            setPasswordError("Password can't be empty.")
        }
        return isValid
    }
    return (
        <div className="container ml-n3">
            {userLoggedIn ? <Redirect to="/profile"/> : null}
        <h4 className="font-weight-bold" style={{color: "navy"}}>
            Sign In
        </h4>

        <div className="row mt-4">
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
            {
                usernameError &&
                <div className="row mt-2">
                    <div className="col-sm-2"/>
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
                       className="form-control"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       id="inputPassword"/>
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
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
            </label>

            <div className="col-sm-10">
                <a className="btn btn-primary btn-block"
                   style={{background: "#1261a0"}}
                    onClick={() => {
                        if(validate()) {
                            console.log('validated')
                            login(username, password, setUserLoggedIn)
                        }
                    }}>
                    Sign In
                </a>
            </div>
        </div>
        <div className="mt-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
            </label>
            <div className="col-sm-10">
                <div className="d-flex justify-content-between">
                    <Link to="/signup">
                        Sign Up
                    </Link>
                    {/*<a href="#">*/}
                    {/*    Forgot Password*/}
                    {/*</a>*/}
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
    setUserLoggedIn: (user) => sessionService.login(user)
        .then(user => {
            console.log(user)
            return dispatch({
                type: SET_CURRENT_USER,
                userLoggedIn: user
            })
        })
        .catch(e => alert('Login failed. Please check your credentials.'))
})

const login = (username, password, setUserLoggedIn) => {
    const user = {
        username,
        password
    }
    setUserLoggedIn(user)
    // sessionService.login(user).then((returnedUser) => console.log(returnedUser))
}

export default connect(stpm, dtpm)(LoginPage)