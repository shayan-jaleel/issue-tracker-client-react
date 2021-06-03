import React, {useEffect, useRef, useState} from "react";
import IssuesService from "../../services/issues-service";
import {Redirect, useLocation, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import IssuesSummaryTable from "./issues-summary-table";
import queryString from 'querystring'
import {SET_SIDEBAR_ACTIVE_MY_ISSUES, SET_SIDEBAR_ACTIVE_MY_PROJECTS} from "../../reducers/sidebar-reducer";
import Switch from "react-switch";

const IssuesPage = ({userLoggedIn, setSidebarActive}) => {
    const [userIssues, setUserIssues] = useState([])
    const [issueSearchText, setIssueSearchText] = useState('')
    const [numItemsPerPage, setNumItemsPerPage] = useState(5)
    const [itemsMeta, setItemsMeta] = useState(null)
    const history = useHistory()
    const location = useLocation()
    const parsedQuery = queryString.parse(location.search.slice(1))
    const isOpen = useRef(false)
    const [refresh, setRefresh] = useState(false)
    // const description = queryString.parse(location.search);

    const getPaginatedItems = (pageNum, pageSize, description) => {
        description && IssuesService
            .findPaginatedMatchingIssuesForUser(userLoggedIn.id, description,
                pageNum, pageSize, isOpen.current)
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
            .findPaginatedIssuesForUser(userLoggedIn.id, pageNum, pageSize, isOpen.current)
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
            getPaginatedItems(urlPageNum? urlPageNum: 1,
                urlPageSize? urlPageSize : numItemsPerPage, description)
        }
    }, [userLoggedIn, description, refresh])

    useEffect(() => {
        if(userLoggedIn){
            setSidebarActive()
            !description &&
            getPaginatedItems(1, numItemsPerPage)
        }
    }, [])
    return (
        <>
            {userLoggedIn ? null : <Redirect to="/login"/>}
            <div className="container-fluid mt-2 ml-n2">
                {/*<span className="row">*/}
                <h4 className="font-weight-bold"
                    style={{color: "navy"}}>
                    All Issues For <span style={{color:"#1261a0"}}>{userLoggedIn && userLoggedIn.username}</span>
                <div className="d-none d-md-block float-right mt-1" style={{fontSize: 18}}>
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
                </div>
                </h4>

                <div className="checkbox mb-4 mt-4">
                    <span className="font-weight-bold mr-2" style={{color: "#ba2f2f"}}>Open Issues Only </span>
                    <Switch borderRadius={15} checkedIcon={false} onColor="#1261a0"
                            uncheckedIcon={false} className="mb-n2" onChange={(checked) => {
                        isOpen.current = checked
                        setRefresh(!refresh)
                        const descriptionInUrl = description? description : ""
                        history.push(`/issues?description=${descriptionInUrl}&pageNum=1&pageSize=${numItemsPerPage}`)
                    }} checked={isOpen.current}/>
                </div>

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
                                <span>of {itemsMeta.totalItems} issues</span>
                            </div>
                        }
                        {
                            itemsMeta &&
                            <div style={{marginLeft: "auto"}} className="mr-3">
                                {itemsMeta.currentPage !== itemsMeta.totalPages
                                &&
                                <div className="btn btn-sm btn-secondary float-right mb-3 ml-2" onClick={() => {
                                    const descriptionInUrl = description? description : ""
                                    history.push(`/issues?description=${descriptionInUrl}&pageNum=${itemsMeta
                                        .currentPage + 1}&pageSize=${numItemsPerPage}`)
                                    getPaginatedItems(itemsMeta.currentPage + 1, numItemsPerPage, description)
                                }}>
                                    Next
                                </div>
                                }
                                <div className="btn btn-sm float-right mb-3 ml-2"> {itemsMeta.currentPage}</div>
                                {itemsMeta.currentPage !== 1 &&
                                <div className="btn btn-sm btn-secondary float-right mb-3" onClick={() => {
                                    const descriptionInUrl = description? description : ""
                                    history.push(`/issues?description=${descriptionInUrl}&pageNum=${itemsMeta
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
};


const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
const dtpm = (dispatch) => ({
    setSidebarActive: () =>
        dispatch({
            type: SET_SIDEBAR_ACTIVE_MY_ISSUES
        })
})
export default connect(stpm, dtpm)(IssuesPage)