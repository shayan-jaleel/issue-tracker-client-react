import {Link, useHistory} from "react-router-dom";
import React from "react";

const IssuesSummaryRow = ({issue}) => {

    const history = useHistory()

    return (
        <>
            {issue.issueId &&
                <tr>
                    <td>
                        <Link to={`/issues/${issue.issueId}`}>{issue.issueId}</Link>
                    </td>
                    <td  className="d-none d-sm-table-cell" style={{color: "gray"}}>
                        {issue.description}
                    </td>
                    <td className="d-none d-sm-table-cell">
                        {issue.priority}
                    </td>
                    <td className="d-none d-sm-table-cell">
                        {issue && issue.projectTitle}
                    </td>
                    <td className="btn btn-primary btn-sm float-right mr-3"
                        style={{backgroundColor:"#1261a0"}}
                        onClick={() => {
                            history.push(`/issues/${issue.issueId}`)
                        }}
                    >View</td>
                </tr>
            }
        </>
    )
}
export default IssuesSummaryRow