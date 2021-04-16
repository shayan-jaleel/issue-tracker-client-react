import LoginPage from "../login/login-page";
import React, {useEffect, useState} from "react";
import IssuesService from "../../services/issues-service";
import {Route} from "react-router-dom";
import IssuesTable from "./issues-table";

//TODO: change based on user
const IssuesPage = () => {
    const [issues, setIssues] = useState([])
    useEffect(() => {
        IssuesService.findAllIssues().then(issues => setIssues(issues))
    }, [])
    return (
        <div className="mt-3">
            <h1>Issues Page</h1>
            {/*<Route path="/issues/table" exact={true} >*/}
            <IssuesTable
                issues={issues}/>
            {/*</Route>*/}
        </div>
    )
}


export default IssuesPage