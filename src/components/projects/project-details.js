import {Link} from "react-router-dom";
import React, {useState} from 'react'
import issuesService from "../../services/issues-service"

const ProjectDetails = () => {
    const [issueTitle, setIssueTitle] = useState('')
    const [issueProject, setIssueProject] = useState('PROJECT-ID-OR-SOMETHING-1')
    const [issueDescription, setIssueDescription] = useState('')
    const [issueType, setIssueType] = useState('BUG')

    const createIssue = () => {
        const newIssue = {
            issueTitle,
            issueProject,
            issueDescription,
            issueType
        }
        console.log('create service called')
        issuesService.createIssue(newIssue).then(r => console.log(r))
    }

    return (
        <div>
            <div className="container mt-3">
                <h1>
                    Create Issue
                </h1>
                <div className="alert alert-success"
                     role="alert">
                    Changes saved!
                </div>
                {/*Project*/}
                <div className="mb-3 row">
                    <label htmlFor="issue-project"
                           className="col-sm-2 col-form-label">
                        Project
                    </label>
                    <div className="col-sm-10">
                        <select id="issue-project"
                                className="form-control"
                                onChange={(e) => setIssueProject(e.target.value)}
                                value={issueProject}>
                            <option value="PROJECT-ID-OR-SOMETHING-1">Project 1</option>
                            <option value="PROJECT-ID-OR-SOMETHING-2">Project 2</option>
                            <option value="PROJECT-ID-OR-SOMETHING-3">Project 3</option>
                        </select>
                    </div>
                </div>

                {/*Title*/}
                <div className="mb-3 row">
                    <label htmlFor="issue-title"
                           className="col-sm-2 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input type="text"
                               className="form-control"
                               id="issue-title"
                               onChange={(e) => setIssueTitle(e.target.value)}
                               value={issueTitle}
                               placeholder="Name your issue"/>
                    </div>
                </div>
                {/*Description*/}
                <div className="mb-3 row">
                    <label htmlFor="issue-description"
                           className="col-sm-2 col-form-label">
                        Description
                    </label>
                    <div className="col-sm-10">
                        <textarea type="text"
                                  className="form-control"
                                  id="issue-description"
                                  onChange={(e) => setIssueDescription(e.target.value)}
                                  value={issueDescription}
                                  placeholder="Describe the issue"
                                  rows="6"/>
                    </div>
                </div>

                {/*type*/}
                <div className="mb-3 row">
                    <label htmlFor="issue-type"
                           className="col-sm-2 col-form-label">
                        Issue Type
                    </label>
                    <div className="col-sm-10">
                        <select id="issue-type"
                                onChange={(e) => setIssueType(e.target.value)}
                                value={issueType}
                                className="form-control">
                            <option value="BUG">Bug/Error</option>
                            <option value="ENHANCEMENT">Enhancement</option>
                        </select>
                    </div>
                </div>

                {/*create*/}
                <div className="mb-3 row">
                    <label htmlFor="issue-type"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <div className="btn btn-success btn-block"
                             onClick={createIssue}>
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

export default ProjectDetails