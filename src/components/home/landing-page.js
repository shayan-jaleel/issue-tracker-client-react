import {Link} from "react-router-dom";
import {connect} from "react-redux";
import sessionService from "../../services/session-service";
import {SET_CURRENT_USER} from "../../reducers/session-reducer";
import {SET_SIDEBAR_ACTIVE_HOME, SET_SIDEBAR_ACTIVE_MY_PROFILE} from "../../reducers/sidebar-reducer";
import {useEffect} from "react";

const LandingPage = ({userLoggedIn, setSidebarActive}) => {
    useEffect(() => {
        setSidebarActive()
    }, [])
    return (
        <div className="container-fluid ml-n5">
        <h1 className="header text-center font-weight-bold m-2">
            <i className="fas text-danger fa-tasks"/><span className="ml-2">On</span>
            <span className="text-danger font-weight-bold">Track </span>
            - Track Bugs and Feature Requests
        </h1>
        {
            !userLoggedIn && <>
                <h3 className="header text-center font-weight-bold text-secondary m-2 mt-5">Get a clear centralized
                    overview of
                    development requests.</h3>
                <h5 className="header text-center text-danger m-2">Track your progress. Sign up below!</h5>
                <div className="d-lg-flex justify-content-center">
                    <Link to="/login" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold">Login</Link>
                    <Link to="/signup" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold">Signup</Link>
                </div>
            </>
        }
        {
            userLoggedIn && <>
                <h3 className="header text-center font-weight-bold text-secondary m-2 mt-5">Hi {userLoggedIn.username},
                    welcome back!</h3>
                <div className="d-lg-flex justify-content-center">
                    <Link to="/issues" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold">My Issues</Link>
                    <Link to="/projects" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold">My Projects</Link>
                </div>
            </>
        }
    </div>
    )
}


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
const dtpm = (dispatch) => ({
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_HOME
        })
})

export default connect(stpm, dtpm)(LandingPage)