import React, {useEffect, useState} from "react";
import IssuesService from "../../services/issues-service";
import {Redirect, useLocation, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import IssuesSummaryTable from "./issues-summary-table";
import queryString from 'querystring'

const IssuesPage = ({userLoggedIn}) => {
    const [userIssues, setUserIssues] = useState([])
    const [issueSearchText, setIssueSearchText] = useState('')
    const history = useHistory()
    const location = useLocation()
    const parsedQuery = queryString.parse(location.search.slice(1))
    // const description = queryString.parse(location.search);
    const description = parsedQuery.description
    useEffect(() => {
        if(userLoggedIn){
            !description && IssuesService.findIssuesForUser(userLoggedIn.id)
                .then(userIssues => setUserIssues(userIssues))
            description && IssuesService.findMatchingIssuesForUser(userLoggedIn.id, description)
                .then(userIssues => setUserIssues(userIssues))
        }
    }, [userLoggedIn, description])
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="mt-3">
                <span className="row">
                    <h3 className="col-6">Issues Page for {userLoggedIn && userLoggedIn.username}</h3>
                    <div className="col-6 d-none d-md-block">
                        <label htmlFor="issue-search-box">Search</label>
                        <input id="issue-search-box"
                               className="ml-3"
                               type="text"
                               value={issueSearchText}
                               onChange={(e) =>
                                   setIssueSearchText(e.target.value)}
                               onKeyPress={(ev) => {
                                   if (ev.key === 'Enter') {
                                       console.log(`Pressed keyCode ${ev.key}`);
                                       history.push(`/issues?description=${issueSearchText}`)
                                       ev.preventDefault();
                                   }}
                               }/>
                    </div>
                </span>
                {/*{userLoggedIn && <h3>for {userLoggedIn.username}</h3>}*/}
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