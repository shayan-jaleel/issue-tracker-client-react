import {Link, useHistory, useParams} from "react-router-dom";
import React from "react";

import {useMediaQuery} from 'react-responsive';
const IssuesRow = ({issue}) => {

    const {projectId} = useParams()
    const history = useHistory()
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    return (
        <tr key={issue.issueId}>
            <td>
                {issue.issueId}
                {/*<Link to={decideUrl(projectId, issue)}>{issue.issueId}</Link>*/}
            </td>
            <td>
                {issue.description}
            </td>
            <td className="d-none d-sm-table-cell">
                {issue.type}
            </td>
            <td className="d-none d-sm-table-cell">
                {issue.priority}
            </td>
            <td className="d-none d-sm-table-cell">
                {issue.status}
            </td>
            <td className={`btn btn-primary btn-sm mr-3 ${(isMobile? "mr-4" : "float-right")}`}
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