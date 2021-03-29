import IssuesRow from "../issues/issues-row";
import userService from "../../services/user-service";
import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";

const ProjectsTable = ({
    projects,
    findProjects,
    createProject,
    deleteProject
}) => {
    useEffect(() => {
        findProjects()
    }, [])
    return <div className="mt-3">
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
                projects.map(project =>
                    <tr key={project._id}>
                        <td><Link to={`/projects/${project._id}`}>{project.name}</Link></td>
                        <td>{project.description}</td>
                        <td/>
                    </tr>
                )
            }
            </tbody>
        </table>
    </div>
}
const stpm = (state) => ({projects: state.projectReducer.projects})

const dtpm = (dispatch) => ({
    findProjects: () => projectService.findAllProjects()
        .then(projects =>
            dispatch({
                type: FIND_ALL_PROJECTS,
                projects: projects
            })),
    createProject: (project) => projectService.createProject(project)
        .then(project => dispatch(
            {
                type: CREATE_PROJECT,
                project: project
            }
        )),
    deleteProject: (projectId) => projectService.deleteProject(projectId)
        .then(status => dispatch(
            {
                type: DELETE_PROJECT,
                projectId: projectId
            }
        ))
})

export default connect(stpm, dtpm)(ProjectsTable)