import {Link, useParams} from "react-router-dom";

const IssuesRow = ({issue}) => {

    const {projectId} = useParams()
    return (
        <tr>
            <td className="text-right">
                <Link to={decideUrl(projectId, issue)}>{issue.id}</Link>
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
            </td>
        </tr>
    )
}
const decideUrl = (projectId, issue) => {
    return projectId? `/projects/${projectId}/issues/${issue.id}` : `/issues/${issue.id}`
}
export default IssuesRow