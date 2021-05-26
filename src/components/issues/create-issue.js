import {Link, useParams} from "react-router-dom";
import React, {useState} from 'react'
import issuesService from "../../services/issues-service"
import {useToasts} from "react-toast-notifications";
import {AiFillFileAdd, AiFillFolderAdd} from "react-icons/all";

const CreateIssue = ({setOpen, getPaginatedItems, numItemsPerPage}) => {
    const [issueDescription, setIssueDescription] = useState('')
    const [issuePriority, setIssuePriority] = useState('HIGH')
    const [issueStatus, setIssueStatus] = useState('OPEN')
    const [issueType, setIssueType] = useState('BUG')
    const {projectId} = useParams()
    const { addToast } = useToasts();

    const createIssue = () => {
        const newIssue = {
            description:issueDescription,
            type: issueType,
            priority: issuePriority,
            status: issueStatus
        }
        console.log('create service called')
        issuesService.createIssueForProject(newIssue, projectId).then(r => {
            console.log(r)
            getPaginatedItems(1, numItemsPerPage)
            setOpen(false)
            addToast('Saved Successfully!',
                { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
        }).catch(e => addToast(`Failed! ${e}`,
            { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 }))
        setIssueDescription('')
        setIssuePriority('HIGH')
        setIssueStatus('OPEN')
        setIssueType('BUG')
    }

    return (
        <>
            <div className="pr-2 pl-2 pt-2" style={{background: "#1261a0", color: "white", display: "flex"}}>
                <AiFillFileAdd className="mr-2" color="white" size="2.3em"/>
                <h3>
                    <span>Create Issue</span>
                </h3>
            </div>
            <div className="container-fluid">
                {/*Description*/}
                <div className="mt-4 row">
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
                {/*Priority*/}
                <div className="mt-3 row">
                    <label htmlFor="issue-priority"
                           className="col-sm-2 col-form-label">
                        Priority
                    </label>
                    <div className="col-sm-10">
                        <select id="issue-priority"
                                onChange={(e) => setIssuePriority(e.target.value)}
                                value={issuePriority}
                                className="form-control">
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                </div>
                {/*status*/}
                <div className="mt-3 row">
                    <label htmlFor="issue-status"
                           className="col-sm-2 col-form-label">
                        Status
                    </label>
                    <div className="col-sm-10">
                        <select id="issue-status"
                                onChange={(e) => setIssueStatus(e.target.value)}
                                value={issueStatus}
                                className="form-control">
                            <option value="OPEN">Open</option>
                            <option value="CLOSED">Closed</option>
                        </select>
                    </div>
                </div>

                {/*type*/}
                <div className="mt-3 row">
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
                <div className="mt-3 row">
                    <label htmlFor="issue-type"
                           className="col-sm-2 col-form-label">

                    </label>
                    <div className="col-sm-10">
                        <div className="btn btn-success btn-block"
                             style={{background: "#1261a0"}}
                            onClick={createIssue}>
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
                             style={{background: "#ba2f2f"}}
                             onClick={() => setOpen(false)}>
                            Cancel
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CreateIssue