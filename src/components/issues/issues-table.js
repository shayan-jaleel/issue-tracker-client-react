import {Link, useParams} from "react-router-dom";
import IssuesRow from "./issues-row";
import {connect} from "react-redux";
const IssuesTable = ({issues, projectId, userLoggedIn}) => {
    console.log(issues)
    return (
        <div className="mt-3">
            {/*<h2>Issues Table</h2>*/}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th className="d-none d-sm-table-cell">Description</th>
                    <th className="d-none d-sm-table-cell">Type</th>
                    <th className="d-none d-sm-table-cell">Priority</th>
                    <th className="d-none d-sm-table-cell">Status</th>
                    <th>
                        {
                        userLoggedIn && (userLoggedIn.role.name === 'ADMIN' || userLoggedIn.role.name === 'MANAGER') &&
                        <Link to={`${projectId}/create-issue`}>
                            <i className="text-danger fas btn fa-plus-circle float-right fa-2x"/>
                        </Link>
                        }
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    issues.map(issue =>
                        <IssuesRow
                            key={issue.id}
                            issue={issue}/>)
                }
                </tbody>
            </table>
        </div>
    )
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
export default connect(stpm)(IssuesTable)