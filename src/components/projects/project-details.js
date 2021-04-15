import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react'
import issuesService from "../../services/issues-service"
import userService from "../../services/user-service";
import {CREATE_USER, DELETE_USER, FIND_ALL_USERS} from "../../reducers/user-reducer";
import {connect} from "react-redux";
import {FIND_ISSUES_FOR_PROJECT, FIND_PROJECT} from "../../reducers/project-issues-reducer";
import projectService from "../../services/project-service";
import IssuesTable from "../issues/issues-table";

const ProjectDetails = ({
    // issues,
    // project,
    // findIssuesForProject,
    // findProject
}) => {
    const {projectId} = useParams();
    const [project, setProject] = useState({})
    const [issues, setIssues] = useState([])
    useEffect(() => {
        // findIssuesForProject(projectId)
        // findProject(projectId)
        projectService.findProject(projectId).then((project) => {
            setProject(project)
            setIssues(project.issues)
        })
    }, [])

    return (
        <div>
            <div className="container mt-3">
                <h3>Project Id:{project.id}</h3>
                <h4>Title: {project.title}</h4>
                <h5>Description: {project.description}</h5>
                <h5>Description: {JSON.stringify(project.issues)}</h5>
                <br/>
                <h4>Issues</h4>
                <ul className="list-group">
                {

                    issues &&
                        <IssuesTable issues={issues}/>
                    // issues.map((issue) =>
                    //     <li key={issue.id} className="list-group-item"> {issue.id} {issue.description}</li>
                    // )
                }
                </ul>
            </div>
        </div>
    )
}
// const stpm = (state) => ({issues: state.projectIssuesReducer.issues,
//                         project: state.projectIssuesReducer.project})
// const dtpm = (dispatch) => ({
//     findIssuesForProject: (projectId) => issuesService.findIssuesForProject(projectId)
//         .then(issues =>
//             dispatch({
//                 type: FIND_ISSUES_FOR_PROJECT,
//                 issues: issues
//             })),
//     findProject: (projectId) => {
//         console.log('reached dtpm')
//         projectService.findProject(projectId)
//             .then(project => dispatch({
//                 type: FIND_PROJECT,
//                 project: project
//             }))
//     }
// })

export default ProjectDetails
// export default connect(stpm, dtpm)(ProjectDetails)