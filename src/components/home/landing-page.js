import {Link} from "react-router-dom";

const LandingPage = () =>
    <div className="container-fluid">
        <h1 className="header text-center font-weight-bold m-2">
            <i className="fas text-danger fa-tasks"/><span className="ml-2">On</span>
                <span className="text-danger font-weight-bold">Track </span>
            - Track Bugs and Feature Requests
        </h1>
        <h3 className="header text-center font-weight-bold text-secondary m-2">Get a clear centralized overview of development requests.</h3>
        <h5 className="header text-center text-danger m-2">Track your progress. Sign up below!</h5>
        <div className="d-lg-flex justify-content-center">
            <Link to="/login" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold">Login</Link>
            <Link to="/signup" className="btn-danger btn-lg btn p-5 m-5 font-weight-bold">Signup</Link>
        </div>
    </div>

export default LandingPage