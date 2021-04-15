import UsersRow from "./users-row";

const UsersTable = ({users}) =>
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
                    <i className="fas fa-th float-right fa-2x"/>
                    <i className="fas fa-sort-alpha-up float-right fa-2x mr-3"/>
                    <i className="fas fa-folder float-right fa-2x mr-3"/>
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

export default UsersTable