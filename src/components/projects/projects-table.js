import IssuesRow from "../issues/issues-row";
import userService from "../../services/user-service";
import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";

const ProjectsTable = ({
    userLoggedIn
}) => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        if(userLoggedIn && userLoggedIn.role.name !== 'ADMIN') {
            projectService.findProjectsForUser(userLoggedIn.id)
                .then(projects => setProjects(projects))
        }
        else if(userLoggedIn && userLoggedIn.role.name === 'ADMIN') {
            projectService.findAllProjects()
                .then(projects => setProjects(projects))
        }
        console.log(projects)
    }, [userLoggedIn])
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="mt-3">
            <h3>Projects</h3>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th className="d-none d-sm-table-cell">Description</th>
                    {/*<th className="d-none d-sm-table-cell">Type</th>*/}
                    {/*<th className="d-none d-sm-table-cell">Created By</th>*/}
                    <th>
                        {userLoggedIn && userLoggedIn.role.name === 'ADMIN' &&
                        <Link to="/create-project"><i className="text-danger fas btn fa-plus-circle float-right fa-2x"/></Link>}
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    projects && projects.map((project, i) =>
                        //Warns when using project id as key
                        <tr key={i}>
                            <td><Link to={`/projects/${project.id}`}>{project.title}</Link></td>
                            <td>{project.description}</td>
                            <td/>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
        </>
    )
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(ProjectsTable)