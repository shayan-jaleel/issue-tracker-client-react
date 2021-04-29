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
            <div className="container ml-n3">
                <div className="card">
                    <h5 className="card-header">Project: <span className="">{project.id}</span></h5>
                    <div className="card-body">
                        <h5 className="card-title"><span className="">{project.title}</span></h5>
                        <p className="card-text"><span className="">{project.description}</span></p>
                    </div>
                </div>
                <br/>
                <ul className="list-group">
                {

                    issues &&
                    <IssuesTable projectId={projectId} issues={issues}/>
                }
                {
                    users &&
                    <UsersTable projectId={projectId} users={users}/>
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