import {Link, useHistory, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import issuesService from "../../services/issues-service";
import commentsService from "../../services/comments-service";
import CommentCard from "../comments/comment-card";
import {connect} from "react-redux";
import CommentList from "../comments/comment-list";

const IssueDetails = ({userLoggedIn}) => {
    const {issueId} = useParams();
    const [issue, setIssue] = useState(null)
    const [issueDescription, setIssueDescription] = useState('')
    const [issuePriority, setIssuePriority] = useState('HIGH')
    const [issueStatus, setIssueStatus] = useState('OPEN')
    const [issueType, setIssueType] = useState('BUG')
    const [editing, setEditing] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState(null)
    const [writtenComment, setWrittenComment] = useState('')
    const [commentInFocus, setCommentInFocus] = useState(false)
    const history = useHistory()
    useEffect(() => {
        setIssue(issue)
    }, [])
    useEffect(() => {
        issuesService.findIssueById(issueId).then((issue) => {
            setIssueDescription(issue.description)
            setIssuePriority(issue.priority)
            setIssueStatus(issue.status)
            setIssueType(issue.type)
        })

    }, [issue])

    const resetIssueFields = () => {
        setIssueDescription('')
        setIssuePriority('HIGH')
        setIssueStatus('OPEN')
        setIssueType('BUG')
    }

    const updateIssue = () => {
        const newIssue = {
            description:issueDescription,
            type: issueType,
            priority: issuePriority,
            status: issueStatus
        }
        issuesService.updateIssue(issueId, newIssue).then(issue => setIssue(issue))
    }


    return (<>
                <div className="container ml-n3 on-track-separator">
                    <h3 className="mb-5">
                        Issue {issueId}
                        <i className="fas fa-trash btn float-right"
                           onClick={() => {
                               issuesService.deleteIssue(issueId).then(r => history.goBack())
                               resetIssueFields()
                           }}/>
                    </h3>

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
                                  disabled={!editing}
                                  value={issueDescription}
                                  placeholder="Describe the issue"
                                  rows="6"/>
                        </div>
                    </div>
                    {/*Priority*/}
                    <div className="mb-3 row">
                        <label htmlFor="issue-priority"
                               className="col-sm-2 col-form-label">
                            Priority
                        </label>
                        <div className="col-sm-10">
                            <select id="issue-priority"
                                    onChange={(e) => setIssuePriority(e.target.value)}
                                    value={issuePriority}
                                    disabled={!editing}
                                    className="form-control">
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                            </select>
                        </div>
                    </div>
                    {/*status*/}
                    <div className="mb-3 row">
                        <label htmlFor="issue-status"
                               className="col-sm-2 col-form-label">
                            Status
                        </label>
                        <div className="col-sm-10">
                            <select id="issue-status"
                                    onChange={(e) => setIssueStatus(e.target.value)}
                                    value={issueStatus}
                                    disabled={!editing}
                                    className="form-control">
                                <option value="OPEN">Open</option>
                                <option value="CLOSED">Closed</option>
                            </select>
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
                                    disabled={!editing}
                                    className="form-control">
                                <option value="BUG">Bug/Error</option>
                                <option value="ENHANCEMENT">Enhancement</option>
                            </select>
                        </div>
                    </div>

                    {/*update*/}
                    {
                        editing &&
                        <div className="mb-3 row">
                        <label htmlFor="issue-type"
                               className="col-sm-2 col-form-label">

                        </label>
                        <div className="col-sm-10">
                            <div style={{color: "white", background:"#1261a0"}} className="btn btn-success btn-block"
                                 onClick={() => {
                                     updateIssue()
                                     setEditing(false)
                                 }}>
                                Update
                            </div>
                        </div>
                    </div>
                    }
                    {/*edit*/}
                    {
                        !editing &&
                        <div className="mb-3 row">
                            <label htmlFor="issue-type"
                                   className="col-sm-2 col-form-label">

                            </label>
                            <div className="col-sm-10">
                                <div style={{color: "white", background:"#1261a0"}} className="btn btn-success btn-block"
                                     onClick={() => setEditing(true)}>
                                    Edit
                                </div>
                            </div>
                        </div>
                    }

                    {/*cancel*/}
                    <div className="mb-3 row">
                        <label htmlFor="dob"
                               className="col-sm-2 col-form-label">

                        </label>
                        <div className="col-sm-10">
                            <div style={{color: "white", background:"#ba2f2f"}}
                                 className="btn btn-danger btn-block"
                                 onClick={() => {
                                     history.goBack()
                                 }}>
                                Cancel
                            </div>
                        </div>
                    </div>
        </div>
            <div className="ml-n3">
            <ul className="nav nav-pills">
                <li className={`nav-item nav-link btn ${showComments? 'on-track-btn-active' : 'on-track-btn-idle'}`}
                    onClick={() => {
                        setShowComments(!showComments)
                        // getComments()
                }}>Comments</li>
            </ul>
                {showComments && <CommentList userLoggedIn={userLoggedIn} issueId={issueId}/>}
            </div>
        </>
    )
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(IssueDetails)