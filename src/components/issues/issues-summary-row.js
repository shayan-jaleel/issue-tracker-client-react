import {Link} from "react-router-dom";

const IssuesSummaryRow = ({issue}) => {

    return (
        <>
            {issue.issueId &&
                <tr>
                    <td>
                        <Link to={`/issues/${issue.issueId}`}>{issue.issueId}</Link>
                    </td>
                    <td>
                        {issue.description}
                    </td>
                    <td>
                        {issue.priority}
                    </td>
                    <td>
                        {issue && issue.projectTitle}
                    </td>
                    <td>
                    </td>
                </tr>
            }
        </>
    )
}
export default IssuesSummaryRow