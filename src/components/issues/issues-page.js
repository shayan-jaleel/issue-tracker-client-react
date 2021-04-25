import LoginPage from "../login/login-page";
import React, {useEffect, useState} from "react";
import IssuesService from "../../services/issues-service";
import {Redirect, Route} from "react-router-dom";
import IssuesTable from "./issues-table";
import {connect} from "react-redux";
import IssuesSummaryTable from "./issues-summary-table";

//TODO: change based on user
const IssuesPage = ({userLoggedIn}) => {
    const [userIssues, setUserIssues] = useState([])
    useEffect(() => {
        if(userLoggedIn){
            IssuesService.findIssuesForUser(userLoggedIn.id).then(userIssues => setUserIssues(userIssues))
        }
    }, [userLoggedIn])
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="mt-3">
                <h1>Issues Page</h1>
                {userLoggedIn && <h1>for {userLoggedIn.username}</h1>}
                {/*<Route path="/issues/table" exact={true} >*/}
                <IssuesSummaryTable
                    userIssues={userIssues}/>
                {/*</Route>*/}
            </div>
        </>
    )
}


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})

export default connect(stpm)(IssuesPage)