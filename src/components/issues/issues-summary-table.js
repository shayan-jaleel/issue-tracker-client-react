import {Link, useParams} from "react-router-dom";
import IssuesRow from "./issues-row";
import IssuesSummaryRow from "./issues-summary-row";
const IssuesSummaryTable = ({userIssues}) => {
    return (
        <div className="mt-3">
            <h2>Issues Table</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Title</th>
                    <th className="d-none d-sm-table-cell">Description</th>
                    <th className="d-none d-sm-table-cell">Priority</th>
                    <th className="d-none d-sm-table-cell">Project</th>
                    <th>
                        <i className="fas fa-th float-right fa-2x"/>
                        <i className="fas fa-sort-alpha-up float-right fa-2x mr-3"/>
                        <i className="fas fa-folder float-right fa-2x mr-3"/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    userIssues.map(issue =>
                        <IssuesSummaryRow
                            key={issue.issueId}
                            issue={issue}/>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default IssuesSummaryTable