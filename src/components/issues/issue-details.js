import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import issuesService from "../../services/issues-service";

const IssueDetails = () => {
    const {issueId} = useParams();
    const [issue, setIssue] = useState({})
    useEffect(() => {
        issuesService.findIssueById(issueId).then((issue) => {
            setIssue(issue)
        })
    }, [])

    return (
        <div>
            <div className="container mt-3">
                <h3>Issue Id:{issue.id}</h3>
                <h5>Description: {issue.description}</h5>
                <h4>Type: {issue.type}</h4>
                <h4>Priority: {issue.priority}</h4>
                <br/>
                <ul className="list-group">
                </ul>
            </div>
        </div>
    )
}
export default IssueDetails