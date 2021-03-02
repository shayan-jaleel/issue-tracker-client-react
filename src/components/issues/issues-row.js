const IssuesRow = ({issue}) => (
    <tr>
        <td>
            {issue.title}
        </td>
        <td>
            {issue.project}
        </td>
        <td>
            {issue.type}
        </td>
        <td>
            {issue.created_by}
        </td>
    </tr>
)

export default IssuesRow