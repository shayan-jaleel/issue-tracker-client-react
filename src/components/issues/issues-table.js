import {Link} from "react-router-dom";
import IssuesRow from "./issues-row";
const IssuesTable = ({issues}) =>
    <div className="mt-3">
        <h2>Issues Table</h2>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Title</th>
                <th className="d-none d-sm-table-cell">Project</th>
                <th className="d-none d-sm-table-cell">Type</th>
                <th className="d-none d-sm-table-cell">Created By</th>
                <th>
                    <i className="fas fa-th float-right fa-2x"></i>
                    <i className="fas fa-sort-alpha-up float-right fa-2x mr-3"></i>
                    <i className="fas fa-folder float-right fa-2x mr-3"></i>
                </th>
            </tr>
            </thead>
            <tbody>
            {
                issues.map(issue =>
                    <IssuesRow
                        key={issue._id}
                        issue={issue}/>)
            }
            </tbody>
        </table>
    </div>

export default IssuesTable