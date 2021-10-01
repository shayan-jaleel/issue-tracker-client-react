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
        <div className="container-fluid ml-n4">
        <h1 className="header text-center font-weight-bold ml-2 mr-2 mb-2">
            <i className="fas fa-tasks"style={{color: "navy"}}/><span className="ml-2" style={{color: "#ba2f2f"}}>On</span>
            <span className="font-weight-bold" style={{color: "navy"}}>Track </span>
            <span>- Track Bugs and Feature Requests</span>
        </h1>
        {
            !userLoggedIn && <>
                <h3 className="header text-center font-weight-bold m-2 mt-5"
                    style={{color: "navy"}}>Get a clear centralized
                    overview of
                    development requests.</h3>
                <h5 className="header text-center text-danger m-2 ml-3">Track your progress. Sign up below!</h5>
                <div className="d-lg-flex justify-content-center">
                    <Link to="/login" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold"
                          style={{background: "#1261a0", width: 200}}>Login</Link>
                    <Link to="/signup" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold"
                          style={{background: "#1261a0", width: 200}}>Signup</Link>
                </div>
            </>
        }
        {
            userLoggedIn && <>
                <h3 className="header text-center font-weight-bold text-secondary m-2 mt-5">Hi
                    <span style={{color: "#1261a0"}}> {userLoggedIn.username}</span>,
                    welcome back!</h3>
                <div className="d-lg-flex justify-content-center">
                    <Link to="/issues" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold"
                          style={{background: "#1261a0", width: 200}}>My <br/>Issues</Link>
                    <Link to="/projects" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold"
                          style={{background: "#1261a0", width: 200}}>My <br/>Projects</Link>
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