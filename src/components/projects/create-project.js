import {Link} from "react-router-dom";
import React, {useState} from 'react'
import projectService from "../../services/project-service"
import {AiFillCloseCircle, AiFillCloseSquare, AiFillFolderAdd} from "react-icons/all";



const CreateProject = ({setOpen}) => {
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    const createProject = () => {
        const newProject = {
            title: projectTitle,
            description: projectDescription
        }
        console.log('create service called')
        projectService.createProject(newProject).then(r => console.log(r))
    }
    return (
        <>
            <div className="p-2" style={{background: "#1261a0", color: "white", display: "flex"}}>
                <AiFillFolderAdd className="mr-2" color="white" size="2.3em"/>
                <h3>
                    <span>Create Project</span>
                </h3>
                {/*<AiFillCloseSquare className="" size="2.3em" color="#ba2f2f"*/}
                {/*                   style={{marginLeft: "auto", padding: "0"}}/>*/}
            </div>
            <div className="container-fluid">
                {/*Title*/}
                <div className="mt-4 row">
                    <label htmlFor="project-title"
                           className="col-sm-2 col-form-label font-weight-bold">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="project-title"
                               onChange={(e) => setProjectTitle(e.target.value)}
                               value={projectTitle}
                               placeholder="Name your project"/>
                    </div>
                </div>
                {/*Description*/}
                <div className="mt-3 row">
                    <label htmlFor="project-description"
                           className="col-sm-2 col-form-label font-weight-bold">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <textarea className="form-control"
                                  id="project-description"
                                  onChange={(e) => setProjectDescription(e.target.value)}
                                  value={projectDescription}
                                  placeholder="Describe the project"
                                  rows="6"/>
                    </div>
                </div>

                {/*create*/}
                <div className="mt-3 row">
                    <label htmlFor="project-type"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <div className="btn btn-success btn-block"
                             style={{background: "#1261a0"}}
                             onClick={createProject}>
                            Create
                        </div>
                    </div>
                </div>

                {/*cancel*/}
                <div className="mt-3 row mb-3">
                    <label htmlFor="dob"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <div className="btn btn-danger btn-block"
                              style={{background: "#ba2f2f"}} onClick={() => setOpen(false)}>
                            Cancel
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CreateProject