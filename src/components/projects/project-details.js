import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react'
import projectService from "../../services/project-service";
import IssuesTable from "../issues/issues-table";
import UsersTable from "../users/users-table";

const ProjectDetails = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState({})
    const [issues, setIssues] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        projectService.findProject(projectId).then((project) => {
            setProject(project)
            setIssues(project.issues)
            setUsers(project.users)
        })
    }, [])

    return (
        <div>
            <div className="container mt-3">
                <h3>Project Id:{project.id}</h3>
                <h4>Title: {project.title}</h4>
                <h5>Description: {project.description}</h5>
                <br/>
                <ul className="list-group">
                {

                    issues &&
                    <IssuesTable issues={issues}/>
                }
                {
                    users &&
                    <UsersTable users={users}/>
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