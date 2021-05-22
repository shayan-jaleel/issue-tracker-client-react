import {Link, useParams} from "react-router-dom";
import IssuesRow from "./issues-row";
import IssuesSummaryRow from "./issues-summary-row";
const IssuesSummaryTable = ({userIssues}) => {
    return (
        <div className="mt-3">
            {/*<h3 className="font-weight-bold">Your Issues</h3>*/}
            <table className="table table-striped">
                <thead style={{color: "navy"}}>
                <tr>
                    <th><h5>ID</h5></th>
                    <th className="d-none d-sm-table-cell"><h5>Description</h5></th>
                    <th className="d-none d-sm-table-cell"><h5>Priority</h5></th>
                    <th className="d-none d-sm-table-cell"><h5>Project</h5></th>
                    <th>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    userIssues && userIssues.map(issue =>
                        <IssuesSummaryRow
                            // key={issue.id}
                            key={issue.issueId}
                            issue={issue}/>)
                }
                </tbody>
            </table>
        </div>
    )
}
export default IssuesSummaryTable