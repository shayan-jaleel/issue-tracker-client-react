import IssuesRow from "../issues/issues-row";
import userService from "../../services/user-service";
import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ProjectsTable = ({
    userLoggedIn
}) => {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        if(userLoggedIn) {
            projectService.findProjectsForUser(userLoggedIn.id)
                .then(projects => setProjects(projects))
        }
        console.log(projects)
    }, [userLoggedIn])
    return (
        <div className="mt-3">
        <h2>Projects Table</h2>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th className="d-none d-sm-table-cell">Description</th>
                {/*<th className="d-none d-sm-table-cell">Type</th>*/}
                {/*<th className="d-none d-sm-table-cell">Created By</th>*/}
                <th>
                    <i className="fas fa-th float-right fa-2x"/>
                    <i className="fas fa-sort-alpha-up float-right fa-2x mr-3"/>
                    <i className="fas fa-folder float-right fa-2x mr-3"/>
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
    )
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(ProjectsTable)