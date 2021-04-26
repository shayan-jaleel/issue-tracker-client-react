import UsersRow from "./users-row";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

const UsersTable = ({users, projectId, userLoggedIn}) =>
    <div className="mt-3">
        <h2>Users Table</h2>
        <table className="table table-striped">
            <thead>
            <tr>
                <th className="d-none d-sm-table-cell">Username</th>
                <th className="d-none d-sm-table-cell">Firstname</th>
                <th className="d-none d-sm-table-cell">Lastname</th>
                <th className="d-none d-sm-table-cell">Role</th>
                <th>
                    {userLoggedIn && userLoggedIn.role.name === 'ADMIN' &&
                    <Link to="/create-project"><i className="text-danger fas btn fa-cog float-right fa-2x"/></Link>}
                </th>
            </tr>
            </thead>
            <tbody>
            {
                users && users.map(user =>
                    <UsersRow
                        key={user.id}
                        user={user}/>)
            }
            </tbody>
        </table>
    </div>

const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
export default connect(stpm)(UsersTable)