const LoginPage = () => {
    return <div className="container mt-3">
        <h1>
            Sign In
        </h1>

        <div className="mb-3 row mt-3">
            <label htmlFor="username"
                   className="col-sm-2 col-form-label">
                Username
            </label>
            <div className="col-sm-10">
                <input type="text"
                       className="form-control"
                       id="username"/>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
                Password
            </label>
            <div className="col-sm-10">
                <input type="password"
                       className="form-control"
                       id="inputPassword"/>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
            </label>

            <div className="col-sm-10">
                <a className="btn btn-primary btn-block"
                   href="#">
                    Sign In
                </a>
            </div>
        </div>
        <div className="mb-3 row">
            <label htmlFor="inputPassword"
                   className="col-sm-2 col-form-label">
            </label>
            <div className="col-sm-10">
                <div className="d-flex justify-content-between">
                    <a href="#">
                        Sign Up
                    </a>
                    <a href="#">
                        Forgot Password
                    </a>
                    <a className="cancel-button" href="#">
                        Cancel
                    </a>
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage