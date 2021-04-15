const IssuesRow = ({issue}) => (
    <tr>
        <td>
            {issue.id}
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
    </tr>
)

export default IssuesRow