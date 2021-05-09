import IssuesRow from "../issues/issues-row";
import userService from "../../services/user-service";
import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {SET_SIDEBAR_ACTIVE_MY_PROFILE, SET_SIDEBAR_ACTIVE_MY_PROJECTS} from "../../reducers/sidebar-reducer";
import commentsService from "../../services/comments-service";

const ProjectsTable = ({
    userLoggedIn,
    setSidebarActive
}) => {
    const [projects, setProjects] = useState([])
    const [numItemsPerPage, setNumItemsPerPage] = useState(5)
    const [itemsMeta, setItemsMeta] = useState(null)
    useEffect(() => {
        setSidebarActive()
        if(userLoggedIn && userLoggedIn.role.name !== 'ADMIN') {
            projectService.findProjectsForUser(userLoggedIn.id)
                .then(projects => setProjects(projects))
        }
        else if(userLoggedIn && userLoggedIn.role.name === 'ADMIN') {
            projectService.findAllProjects()
                .then(projectsPage => {
                    setProjects(projectsPage.items)
                    setItemsMeta({
                        currentPage: projectsPage.currentPage,
                        totalPages: projectsPage.totalPages,
                        totalItems: projectsPage.totalItems,
                        pageSize: projectsPage.pageSize
                    })
                })
        }
        console.log(projects)
    }, [userLoggedIn])

    const getPaginatedItems = (pageNum, pageSize) => {
        projectService.findAllPaginatedProjects(pageNum, pageSize).then((projectsPage) => {
            setProjects(projectsPage.items)
            setItemsMeta({
                currentPage: projectsPage.currentPage,
                totalPages: projectsPage.totalPages,
                totalItems: projectsPage.totalItems,
                pageSize: projectsPage.pageSize
            })
        })
    }
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="mr-3">
            <h3>Projects</h3>
            {
                projects && projects.length > 0 &&
                <div className="mt-4 mb-3">
                    Show
                    <select onChange={(e) => {
                        let selectedVal = parseInt(e.target.value)
                        setNumItemsPerPage(selectedVal)
                        getPaginatedItems( 1, selectedVal)
                    }}
                            value={numItemsPerPage}
                            className="mr-2 ml-2"
                            style={{width: "3rem"}}>
                        <option value= '5'>5</option>
                        <option value= '10'>10</option>
                        <option value= '15'>15</option>
                    </select>
                    entries
                </div>
            }
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
                        // Warns when using project id as key
                        <tr key={i}>
                            <td><Link to={`/projects/${project.id}`}>{project.title}</Link></td>
                            <td>{project.description}</td>
                            <td/>
                        </tr>
                    )
                }
                </tbody>
            </table>

                {
                    projects && projects.length > 0 &&
                    <div className="">
                        {
                            itemsMeta &&
                            <div>
                                Showing <span>{(itemsMeta.currentPage - 1) * itemsMeta.pageSize + 1}</span>
                                <span className="ml-1 mr-1">to {Math.min(itemsMeta.totalItems,
                                    (itemsMeta.currentPage) * itemsMeta.pageSize)}
                            </span>
                                <span>of {itemsMeta.totalItems} projects</span>
                            </div>
                        }
                        {
                            itemsMeta &&
                            <div>
                                {itemsMeta.currentPage !== itemsMeta.totalPages
                                &&
                                <button className="float-right mt-n4 mb-3 ml-2" onClick={() =>
                                    getPaginatedItems(itemsMeta.currentPage+1, 5)}>
                                    Next
                                </button>
                                }
                                <div className="float-right mt-n4 mb-3 ml-2"> {itemsMeta.currentPage}</div>
                                {itemsMeta.currentPage !== 1 &&
                                <button className="float-right mt-n4 mb-3" onClick={() =>
                                    getPaginatedItems(itemsMeta.currentPage-1, 5)}>
                                    Previous
                                </button>
                                }
                            </div>
                        }
                    </div>
                }
        </div>
        </>
    )
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

const dtpm = (dispatch) => ({
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_MY_PROJECTS
        })
})

export default connect(stpm, dtpm)(ProjectsTable)