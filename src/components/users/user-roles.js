const userRoles = () =>
    <>
        <table className="table">
            <thead>
            <tr>
                <th>Username</th>
                {/*<th>Password</th>*/}
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>&nbsp;</th>
            </tr>
            <tr>
                <td><input className="form-control"
                           placeholder="Username"/></td>
                {/*<td><input className="form-control"*/}
                {/*           type="password"*/}
                {/*           placeholder="Password"/></td>*/}
                <td><input className="form-control"
                           placeholder="First Name"/></td>
                <td><input className="form-control"
                           placeholder="Last Name"/></td>
                <td>
                    <select className="form-control">
                    <option value="ADMIN">Administrator</option>
                    <option value="DEVELOPER">Developer</option>
                    <option value="MANAGER">Project Manager</option>
                    </select></td>
                {/*<td><span className="pull-right" style="white-space: nowrap">*/}
                <td>
                    <span className="pull-right fa-button-pull-fix">
                    <i className="fa fa-search wbdv-update-icon btn btn-dark"/>
                    <i className="fa fa-plus wbdv-create-icon btn btn-dark"/>
                    <i className="fa fa-check wbdv-update-icon btn btn-dark"/>
                    </span>
                </td>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </>


export default userRoles