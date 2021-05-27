import React, {useEffect, useState} from "react";
import {Link, Redirect, useHistory, useParams} from "react-router-dom";
import userService from "../../services/user-service";
import projectService from "../../services/project-service";
import {FaUserCircle, GiFullFolder} from "react-icons/all";

const UserProfile = () => {
    const {userId} = useParams()
    const [user, setUser] = useState(null)
    const [projects, setProjects] = useState([])
    const history = useHistory()
    useEffect(
        () => {
            userService.findUserById(userId).then((user) => {
                console.log(user)
                setUser(user)
            })
            projectService.findProjectsForUser(userId).then(projects => setProjects(projects))
        }, [userId]
    )
    return (
        <>
            <div className="container-fluid">
                <h4 className="font-weight-bold" style={{color: "navy"}}>
                    Profile
                </h4>
                <div className="" style={{display: "flex", alignItems: "flex-start"}}>
                <div style={{width: "15%"}}>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                         width="100%"
                         className="mr-5 mt-4"
                         alt="Profile Picture"/>
                    <h5 style={{textAlign: "center", color: "navy"}}
                        className="font-weight-bold mt-2">{user && user.username ? user.username : ''}</h5>
                    <div style={{textAlign: "center", color: "#1261a0"}}>{user && user.role ? user.role.name : 'DEVELOPER'}</div>
                </div>
                <div style={{flexGrow: 5}} className="ml-5 mt-4 mr-4">
                <h5 style={{color: "#1261a0"}} className="font-weight-bold">
                    <FaUserCircle className="mr-2 mb-1" size="1.5em" style={{display: "inline"}}/> About</h5>
                <div className="mt-3 row" >
                    <label
                        className="col-sm-2 col-form-label">
                        Username
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               readOnly
                               className="form-control"
                               id="username"
                               value={user && user.username ? user.username : ''}/>
                    </div>
                </div>

                <div className="mt-3 row">
                    <label htmlFor="firstname"
                           className="col-sm-2 col-form-label">
                        Firstname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               readOnly
                               className="form-control"
                               id="firstname"
                               value={user && user.firstname ? user.firstname : ''}/>
                    </div>
                </div>

                <div className="mt-3 row">
                    <label htmlFor="lastname"
                           className="col-sm-2 col-form-label">
                        Lastname
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               readOnly
                               className="form-control"
                               id="lastname"
                               value={user && user.lastname ? user.lastname : ''}/>
                    </div>
                </div>

                <div className="mt-3 row">
                    <label htmlFor="email"
                           className="col-sm-2 col-form-label">
                        Email
                    </label>
                    <div className="col-sm-10">
                        <input type="email"
                               readOnly
                               className="form-control"
                               value={user && user.email ? user.email : ''}
                               title="Please enter a valid email"
                               id="email"/>
                    </div>
                </div>

                <div className="mt-3 row">
                    <label htmlFor="role"
                           className="col-sm-2 col-form-label">
                        Role
                    </label>
                    <div className="col-sm-10">
                        <select id="role" className="form-control"
                                value={user && user.role ? user.role.name : 'DEVELOPER'}
                                disabled={true}>
                            <option value='ADMIN'>Admin</option>
                            <option value='DEVELOPER'>Developer</option>
                            <option value='MANAGER'>Manager</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                <h5 className="font-weight-bold" style={{color: "#1261a0"}}>
                    <GiFullFolder size="1.5em" className="mr-2 mb-1"/>Projects They're Working On</h5>
                <ol className="list-group mt-3">
                    {
                        projects.map((project) =>
                        <li key={project.id} className="list-group-item">
                            {project.title}
                            <div className="btn btn-primary btn-sm float-right mr-3"
                                style={{backgroundColor:"#1261a0"}}
                                onClick={() => {
                                    history.push(`/projects/${project.id}`)
                                }}
                            >View</div>
                            </li>
                        )
                    }
                </ol>
                </div>
            </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile