import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react'
import projectService from "../../services/project-service";
import IssuesTable from "../issues/issues-table";
import UsersTable from "../users/users-table";
import IssuesService from "../../services/issues-service";
import ProjectService from "../../services/project-service";

const ProjectDetails = () => {
    const {projectId} = useParams();
    const [project, setProject] = useState({})
    const [issues, setIssues] = useState([])
    const [users, setUsers] = useState([])
    const [numIssuesPerPage, setNumIssuesPerPage] = useState(5)
    const [issuesMeta, setIssuesMeta] = useState(null)
    const [numUsersPerPage, setNumUsersPerPage] = useState(5)
    const [usersMeta, setUsersMeta] = useState(null)

    const getPaginatedIssues = (pageNum, pageSize) => {
        IssuesService
            .findPaginatedIssuesForProject(projectId, pageNum, pageSize)
            .then((projectIssuesPage) => {
                setIssues(projectIssuesPage.items)
                setIssuesMeta({
                    currentPage: projectIssuesPage.currentPage,
                    totalPages: projectIssuesPage.totalPages,
                    totalItems: projectIssuesPage.totalItems,
                    pageSize: projectIssuesPage.pageSize
                })
            })
    }
    const getPaginatedUsers = (pageNum, pageSize) => {
        ProjectService
            .findPaginatedIssuesForProject(projectId, pageNum, pageSize)
            .then((projectIssuesPage) => {
                setUsers(projectIssuesPage.items)
                setUsersMeta({
                    currentPage: projectIssuesPage.currentPage,
                    totalPages: projectIssuesPage.totalPages,
                    totalItems: projectIssuesPage.totalItems,
                    pageSize: projectIssuesPage.pageSize
                })
            })
    }
    useEffect(() => {
        projectService.findProject(projectId).then((project) => {
            setProject(project)
            getPaginatedIssues(1, numIssuesPerPage)
            getPaginatedUsers(1, numUsersPerPage)
            // setIssues(project.issues)
            setUsers(project.users)
        })
    }, [])

    return (
        <div className="container-fluid ml-n4">
            <div className="container-fluid">
                <div className="card">
                    <h4 className="card-header font-weight-bold" style={{color: "navy"}}>
                        Project: <span style={{color: "#1261a0"}}>{project.id}</span>
                    </h4>
                    <div className="card-body">
                        <h4 className="card-title" style={{color: "#1261a0"}}><span className="">{project.title}</span></h4>
                        <p className="card-text"><span className="">{project.description}</span></p>
                    </div>
                </div>
                <br/>
                <ul className="list-group">
                    <div className="mb-3 container-fluid border-bottom mt-2">
                    <h4 className="font-weight-bold" style={{color: "navy"}}>Project Issues</h4>
                    {
                        issues && issues.length > 0 &&
                        <div className="mt-4 mb-1">
                            Show
                            <select onChange={(e) => {
                                const selectedVal = parseInt(e.target.value)
                                setNumIssuesPerPage(selectedVal)
                                getPaginatedIssues( 1, selectedVal)
                            }}
                                    value={numIssuesPerPage}
                                    className="mr-2 ml-2"
                                    style={{width: "3rem"}}>
                                <option value= '5'>5</option>
                                <option value= '10'>10</option>
                                <option value= '15'>15</option>
                            </select>
                            entries
                        </div>
                    }
                {

                    issues &&
                    <IssuesTable projectId={projectId} issues={issues}
                                 numItemsPerPage={numIssuesPerPage} getPaginatedItems={getPaginatedIssues}/>
                }
                {
                    issues && issues.length > 0 &&
                    <div className="" style={{display: "flex"}}>
                        {
                            issuesMeta &&
                            <div>
                                Showing <span>{(issuesMeta.currentPage - 1) * issuesMeta.pageSize + 1}</span>
                                <span className="ml-1 mr-1">to {Math.min(issuesMeta.totalItems,
                                    (issuesMeta.currentPage) * issuesMeta.pageSize)}
                                </span>
                                <span>of {issuesMeta.totalItems} issues</span>
                            </div>
                        }
                        {
                            issuesMeta &&
                            <div style={{marginLeft: "auto"}} className="mr-3">
                                {issuesMeta.currentPage !== issuesMeta.totalPages
                                &&
                                <div className="btn btn-sm btn-secondary float-right mb-3 ml-2" onClick={() => {
                                    getPaginatedIssues(issuesMeta.currentPage + 1, numIssuesPerPage)
                                }}>
                                    Next
                                </div>
                                }
                                <div className="btn btn-sm float-right mb-3 ml-2"> {issuesMeta.currentPage}</div>
                                {issuesMeta.currentPage !== 1 &&
                                <div className="btn btn-sm btn-secondary float-right mb-3" onClick={() => {
                                    getPaginatedIssues(issuesMeta.currentPage - 1, numIssuesPerPage)
                                }}>
                                    Previous
                                </div>
                                }
                            </div>
                        }
                    </div>
                }
                    </div>

                    <div className="container-fluid mt-4 border-bottom mb-1">
                    <h4 className="font-weight-bold" style={{color: "navy"}}>Project Users</h4>
                    {
                        users && users.length > 0 &&
                        <div className="mt-4 mb-1">
                            Show
                            <select onChange={(e) => {
                                const selectedVal = parseInt(e.target.value)
                                setNumUsersPerPage(selectedVal)
                                getPaginatedUsers( 1, selectedVal)
                            }}
                                    value={numUsersPerPage}
                                    className="mr-2 ml-2"
                                    style={{width: "3rem"}}>
                                <option value= '5'>5</option>
                                <option value= '10'>10</option>
                                <option value= '15'>15</option>
                            </select>
                            entries
                        </div>
                    }

                {
                    users &&
                    <UsersTable projectId={projectId} users={users}/>
                }
                    {
                        users && users.length > 0 &&
                        <div className="" style={{display: "flex"}}>
                            {
                                usersMeta &&
                                <div>
                                    Showing <span>{(usersMeta.currentPage - 1) * usersMeta.pageSize + 1}</span>
                                    <span className="ml-1 mr-1">to {Math.min(usersMeta.totalItems,
                                        (usersMeta.currentPage) * usersMeta.pageSize)}
                                    </span>
                                    <span>of {usersMeta.totalItems} users</span>
                                </div>
                            }
                            {
                                usersMeta &&
                                <div style={{marginLeft: "auto"}} className="mr-3">
                                    {usersMeta.currentPage !== usersMeta.totalPages
                                    &&
                                    <div className="btn btn-sm btn-secondary float-right mb-3 ml-2" onClick={() => {
                                        getPaginatedUsers(usersMeta.currentPage + 1, numUsersPerPage)
                                    }}>
                                        Next
                                    </div>
                                    }
                                    <div className="btn btn-sm float-right mb-3 ml-2"> {usersMeta.currentPage}</div>
                                    {usersMeta.currentPage !== 1 &&
                                    <div className="btn btn-sm btn-secondary float-right mb-3" onClick={() => {
                                        getPaginatedUsers(usersMeta.currentPage - 1, numUsersPerPage)
                                    }}>
                                        Previous
                                    </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                    </div>
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