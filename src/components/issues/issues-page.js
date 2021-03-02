import LoginPage from "../login/login-page";
import React from "react";
import IssuesService from "../../services/issues-service";
import {Route} from "react-router-dom";
import IssuesTable from "./issues-table";

export default class Issues extends React.Component{
    state = {
        issues: [
            {
                _id: 1,
                title: 'Improve UI Design',
                project: 'mars rover',
                description: 'Current UI sucks. Do better!',
                type: 'ENHANCEMENT',
                created_by: 'Shayan'
            },

            {
                _id: 2,
                title: 'Improve UI Design 2',
                project: 'mars rover 2',
                description: 'Current UI sucks 2. Do better!',
                type: 'BUG',
                created_by: 'Aavur Draal'
            }
        ]
    }
    // componentDidMount() {
    //     IssuesService.findAllIssues()
    //         .then((issues) => this.setState({issues}))
    // }
    render() {
        return(
            <div className="mt-3">
                {/*<Route path="/issues/table" exact={true} >*/}
                    <IssuesTable
                        issues={this.state.issues}/>
                {/*</Route>*/}
            </div>
        )
    }
}


// export default Issues