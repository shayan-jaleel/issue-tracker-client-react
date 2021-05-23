import {Link, useParams} from "react-router-dom";

const IssuesRow = ({issue}) => {

    const {projectId} = useParams()
    return (
        <tr>
            <td className="text-right">
                <Link to={decideUrl(projectId, issue)}>{issue.issueId}</Link>
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
            <td>
            </td>
        </tr>
    )
}
const decideUrl = (projectId, issue) => {
    return projectId? `/projects/${projectId}/issues/${issue.issueId}` : `/issues/${issue.issueId}`
}
export default IssuesRow