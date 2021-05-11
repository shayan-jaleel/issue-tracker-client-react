import IssuesRow from "../issues/issues-row";
import userService from "../../services/user-service";
import projectService from "../../services/project-service";
import {CREATE_PROJECT, DELETE_PROJECT, FIND_ALL_PROJECTS} from "../../reducers/project-reducer";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import {SET_SIDEBAR_ACTIVE_MY_PROFILE, SET_SIDEBAR_ACTIVE_MY_PROJECTS} from "../../reducers/sidebar-reducer";
import Modal from 'react-modal'
import CreateProject from "./create-project";
import ReactDom from "react-dom"
import {AiFillFolderAdd} from "react-icons/all";

//hide rest of the app for screen readers
Modal.setAppElement('#root')
const ProjectsTable = ({
    userLoggedIn,
    setSidebarActive
}) => {
    const [projects, setProjects] = useState([])
    const [numItemsPerPage, setNumItemsPerPage] = useState(5)
    const [itemsMeta, setItemsMeta] = useState(null)
    const [showCreateProject, setShowCreateProject] = useState(false)
    const history = useHistory()
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
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            width: '60%',
            marginRight           : '-50%',
            padding : 0,
            transform             : 'translate(-50%, -50%)',
            border : '1px solid gray'
        },
        overlay: {zIndex: 1000}
    };

    return (
        <>
            {
                <Modal style={customStyles} isOpen={showCreateProject} onRequestClose={() => {
                        setShowCreateProject(false)
                    }}>
                    <CreateProject setOpen={setShowCreateProject} setProjects={setProjects}/>
                </Modal>
            }
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="mr-3">
            <h3>Projects</h3>
            <div className="container-fluid">
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
                <thead style={{color: "navy"}}>
                <tr>
                    <th><h4>Name</h4></th>
                    <th className="d-none d-sm-table-cell"><h4>Description</h4></th>
                    {/*<th className="d-none d-sm-table-cell">Type</th>*/}
                    {/*<th className="d-none d-sm-table-cell">Created By</th>*/}
                    <th>
                        {
                            userLoggedIn && userLoggedIn.role.name === 'ADMIN' &&
                            <div className="on-track-icon float-right pl-1 pr-1 pt-1"
                                  style={{border: "1px solid navy", display: "flex", background: "#1261a0"}} onClick={() => {
                                setShowCreateProject(true)
                                console.log(showCreateProject)
                            }}>
                                <AiFillFolderAdd className="mb-1 mr-1" color="white" size="2em"/>
                                <div className="mt-1" style={{color: "white"}}>Create Project</div>
                            </div>
                        }
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    projects && projects.map((project, i) =>
                        // Warns when using project id as key
                        <tr key={i}>
                            <td className="font-weight-bold">{project.title}</td>
                            {/*<td><Link to={`/projects/${project.id}`}>{project.title}</Link></td>*/}
                            <td style={{color: "gray"}}>{project.description}</td>
                            <td className="btn btn-primary btn-sm float-right mr-3"
                                style={{backgroundColor:"#1261a0"}}
                                onClick={() => {
                                    history.push(`/projects/${project.id}`)
                                }}
                            >View</td>
                        </tr>
                    )
                }
                </tbody>
            </table>

                {
                    projects && projects.length > 0 &&
                    <div className="" style={{display: "flex"}}>
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
                            <div style={{marginLeft: "auto"}} className="mr-3">
                                {itemsMeta.currentPage !== itemsMeta.totalPages
                                &&
                                <div className="btn btn-sm btn-secondary float-right mb-3 ml-2" onClick={() =>
                                    getPaginatedItems(itemsMeta.currentPage+1, 5)}>
                                    Next
                                </div>
                                }
                                <div className="btn btn-sm float-right mb-3 ml-2"> {itemsMeta.currentPage}</div>
                                {itemsMeta.currentPage !== 1 &&
                                <div className="btn btn-sm btn-secondary float-right mb-3" onClick={() =>
                                    getPaginatedItems(itemsMeta.currentPage-1, 5)}>
                                    Previous
                                </div>
                                }
                            </div>
                        }
                    </div>
                }
                </div>
        </div>
        </>
    )
};
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

const dtpm = (dispatch) => ({
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_MY_PROJECTS
        })
})

export default connect(stpm, dtpm)(ProjectsTable)