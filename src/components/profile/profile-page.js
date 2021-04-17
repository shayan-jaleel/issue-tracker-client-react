import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";

const ProfilePage = ({
     userLoggedIn
 }) => (
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
                       value="Alice"/>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="phone"
                   className="col-sm-2 col-form-label">
                Phone
            </label>
            <div className="col-sm-10">
                <input type="tel"
                       className="form-control"
                       placeholder="(123) 456-7890"
                       id="phone"/>
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
                       title="Please enter a valid email"
                       placeholder="alice@wonderland.com"
                       id="email"/>
            </div>
        </div>

        <div className="mb-3 row">
            <label htmlFor="role"
                   className="col-sm-2 col-form-label">
                Role
            </label>
            <div className="col-sm-10">
                <select id="role" className="form-control">
                    <option>Faculty</option>
                    <option>Student</option>
                    <option>Admin</option>
                </select>
            </div>
        </div>

        <div className="mb-3 row">
            <label htmlFor="dob"
                   className="col-sm-2 col-form-label">
                DOB
            </label>
            <div className="col-sm-10">
                <input type="date"
                       className="form-control"
                       title="Please enter your DOB"
                       id="dob"/>
            </div>
        </div>

        <div className="mb-3 row">
            <label htmlFor="dob"
                   className="col-sm-2 col-form-label">

            </label>
            <div className="col-sm-10">
                <a className="btn btn-success btn-block">
                    Update
                </a>
            </div>
        </div>

        <div className="mb-3 row">
            <label htmlFor="dob"
                   className="col-sm-2 col-form-label">

            </label>
            <div className="col-sm-10">
                <a className="btn btn-danger btn-block"
                   href="../index.html">
                    Logout
                </a>
            </div>
        </div>

    </div>
)

const stpm = (state) => ({userLoggedIn: state.sessionReducer.userLoggedIn})

export default connect(stpm)(ProfilePage)