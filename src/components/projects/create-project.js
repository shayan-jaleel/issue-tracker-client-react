import {Link} from "react-router-dom";
import React, {useState} from 'react'
import projectService from "../../services/project-service"

const CreateProject = () => {
    const [issueTitle, setIssueTitle] = useState('')
    const [issueDescription, setIssueDescription] = useState('')

    const createProject = () => {
        const newProject = {
            issueTitle,
            issueDescription
        }
        console.log('create service called')
        projectService.createProject(newProject).then(r => console.log(r))
    }

    return (
        <div>
            <div className="container mt-3">
                <h1>
                    Create Project
                </h1>
                <div className="alert alert-success"
                     role="alert">
                    Changes saved!
                </div>

                {/*Title*/}
                <div className="mb-3 row">
                    <label htmlFor="project-title"
                           className="col-sm-2 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="project-title"
                               onChange={(e) => setIssueTitle(e.target.value)}
                               value={issueTitle}
                               placeholder="Name your project"/>
                    </div>
                </div>
                {/*Description*/}
                <div className="mb-3 row">
                    <label htmlFor="project-description"
                           className="col-sm-2 col-form-label">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <textarea type="text"
                                  className="form-control"
                                  id="project-description"
                                  onChange={(e) => setIssueDescription(e.target.value)}
                                  value={issueDescription}
                                  placeholder="Describe the project"
                                  rows="6"/>
                    </div>
                </div>

                {/*create*/}
                <div className="mb-3 row">
                    <label htmlFor="project-type"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <div className="btn btn-success btn-block"
                             onClick={createProject}>
                            Create
                        </div>
                    </div>
                </div>

                {/*cancel*/}
                <div className="mb-3 row">
                    <label htmlFor="dob"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <Link to="/" className="btn btn-danger btn-block">
                            Cancel
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateProject