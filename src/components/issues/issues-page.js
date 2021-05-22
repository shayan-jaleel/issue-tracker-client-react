import React, {useEffect, useState} from "react";
import IssuesService from "../../services/issues-service";
import {Redirect, useLocation, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import IssuesSummaryTable from "./issues-summary-table";
import queryString from 'querystring'
import {SET_SIDEBAR_ACTIVE_MY_ISSUES, SET_SIDEBAR_ACTIVE_MY_PROJECTS} from "../../reducers/sidebar-reducer";

const IssuesPage = ({userLoggedIn, setSidebarActive}) => {
    const [userIssues, setUserIssues] = useState([])
    const [issueSearchText, setIssueSearchText] = useState('')
    const [numItemsPerPage, setNumItemsPerPage] = useState(5)
    const [itemsMeta, setItemsMeta] = useState(null)
    const history = useHistory()
    const location = useLocation()
    const parsedQuery = queryString.parse(location.search.slice(1))
    // const description = queryString.parse(location.search);

    const getPaginatedItems = (pageNum, pageSize, description) => {
        description && IssuesService
            .findPaginatedMatchingIssuesForUser(userLoggedIn.id, description,
                pageNum, pageSize)
            .then((userIssuesPage) => {
                console.log(userIssuesPage)
                console.log(pageSize)
                setUserIssues(userIssuesPage.items)
                setIssueSearchText(description)
                setNumItemsPerPage(pageSize)
                setItemsMeta({
                    currentPage: userIssuesPage.currentPage,
                    totalPages: userIssuesPage.totalPages,
                    totalItems: userIssuesPage.totalItems,
                    pageSize: userIssuesPage.pageSize
                })
        })
        !description && IssuesService
            .findPaginatedIssuesForUser(userLoggedIn.id, pageNum, pageSize)
            .then((userIssuesPage) => {
            setUserIssues(userIssuesPage.items)
            setItemsMeta({
                currentPage: userIssuesPage.currentPage,
                totalPages: userIssuesPage.totalPages,
                totalItems: userIssuesPage.totalItems,
                pageSize: userIssuesPage.pageSize
            })
        })
    }
    const description = parsedQuery.description
    const urlPageNum = parsedQuery.pageNum
    const urlPageSize = parsedQuery.pageSize
    const DEFAULT_PAGE_SIZE = 5
    useEffect(() => {
        if(userLoggedIn){
            setSidebarActive()
            // console.log('urlPageNum = ' + urlPageNum)
            // console.log('urlPageSize = ' + urlPageSize)
            // setNumItemsPerPage(prevVal => (urlPageSize? urlPageSize : (prevVal? prevVal : DEFAULT_PAGE_SIZE)))
            !description &&
                getPaginatedItems(1, numItemsPerPage)
            description &&
                getPaginatedItems(urlPageNum? urlPageNum: 1,
                    urlPageSize? urlPageSize : numItemsPerPage, description)
            // IssuesService.findPaginatedMatchingIssuesForUser(userLoggedIn.id, description, 1, numItemsPerPage)
            //     .then(userIssues => setUserIssues(userIssues))
        }
    }, [userLoggedIn, description])
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="mr-3">
                {/*<span className="row">*/}
                <h3 className="">Issues Page for {userLoggedIn && userLoggedIn.username}
                <span className="d-none d-md-block float-right" style={{fontSize: 18}}>
                    <label htmlFor="issue-search-box">Search</label>
                    <input id="issue-search-box"
                       className="ml-3"
                       type="text"
                       style={{fontSize: 16}}
                       placeholder="Description keywords"
                       value={issueSearchText}
                       onChange={(e) =>
                           setIssueSearchText(e.target.value)}
                       onKeyPress={(ev) => {
                           if (ev.key === 'Enter') {
                               console.log(`Pressed keyCode ${ev.key}`);
                               history.push(`/issues?description=${issueSearchText}&pageNum=1&pageSize=${numItemsPerPage}`)
                               getPaginatedItems(1, numItemsPerPage, issueSearchText)
                               ev.preventDefault();
                           }}
                       }/>
                </span>
                </h3>
                {/*</span>*/}
                {/*{userLoggedIn && <h3>for {userLoggedIn.username}</h3>}*/}
                {/*<Route path="/issues/table" exact={true} >*/}

                {
                    userIssues && userIssues.length > 0 &&
                    <div className="mt-4 mb-3">
                        Show
                        <select onChange={(e) => {
                                    const selectedVal = parseInt(e.target.value)
                                    setNumItemsPerPage(selectedVal)
                                    const descriptionInUrl = description? description : ""
                                    history.push(`/issues?description=${descriptionInUrl}&pageNum=1&pageSize=${selectedVal}`)
                                    getPaginatedItems( 1, selectedVal, description)
                                }}
                                value={numItemsPerPage}
                                className="mr-2 ml-2"
                                style={{width: "3rem"}}>
                            <option value= '5'>5</option>
                            <option value= '10'>10</option>
                            <option value= '15'>15</option>
                        </select>
                        entries
                    </div>
                }
                <IssuesSummaryTable
                    userIssues={userIssues}/>

                {
                    userIssues && userIssues.length > 0 &&
                    <div className="" style={{display: "flex"}}>
                        {
                            itemsMeta &&
                            <div>
                                Showing <span>{(itemsMeta.currentPage - 1) * itemsMeta.pageSize + 1}</span>
                                <span className="ml-1 mr-1">to {Math.min(itemsMeta.totalItems,
                                    (itemsMeta.currentPage) * itemsMeta.pageSize)}
                            </span>
                                <span>of {itemsMeta.totalItems} projects</span>
                            </div>
                        }
                        {
                            itemsMeta &&
                            <div style={{marginLeft: "auto"}} className="mr-3">
                                {itemsMeta.currentPage !== itemsMeta.totalPages
                                &&
                                <div className="btn btn-sm btn-secondary float-right mb-3 ml-2" onClick={() => {
                                    history.push(`/issues?description=${description}&pageNum=${itemsMeta
                                        .currentPage + 1}&pageSize=${numItemsPerPage}`)
                                    getPaginatedItems(itemsMeta.currentPage + 1, numItemsPerPage, description)
                                }}>
                                    Next
                                </div>
                                }
                                <div className="btn btn-sm float-right mb-3 ml-2"> {itemsMeta.currentPage}</div>
                                {itemsMeta.currentPage !== 1 &&
                                <div className="btn btn-sm btn-secondary float-right mb-3" onClick={() => {
                                    history.push(`/issues?description=${description}&pageNum=${itemsMeta
                                        .currentPage - 1}&pageSize=${numItemsPerPage}`)
                                    getPaginatedItems(itemsMeta.currentPage - 1, numItemsPerPage, description)
                                }}>
                                    Previous
                                </div>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    )
}


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
const dtpm = (dispatch) => ({
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_MY_ISSUES
        })
})
export default connect(stpm, dtpm)(IssuesPage)