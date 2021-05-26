import {Link, useHistory, useParams} from "react-router-dom";
import React from "react";

const IssuesRow = ({issue}) => {

    const {projectId} = useParams()
    const history = useHistory()
    return (
        <tr key={issue.issueId}>
            <td className="text-right">
                {issue.issueId}
                {/*<Link to={decideUrl(projectId, issue)}>{issue.issueId}</Link>*/}
            </td>
            <td>
                {issue.description}
            </td>
            <td>
                {issue.type}
            </td>
            <td>
                {issue.priority}
            </td>
            <td>
                {issue.status}
            </td>
            <td className="btn btn-primary btn-sm float-right mr-3"
                style={{backgroundColor:"#1261a0"}}
                onClick={() => {
                    history.push(`/issues/${issue.issueId}`)
                }}
            >View</td>
        </tr>
    )
}
// const decideUrl = (projectId, issue) => {
//     return projectId? `/projects/${projectId}/issues/${issue.issueId}` : `/issues/${issue.issueId}`
// }
export default IssuesRow