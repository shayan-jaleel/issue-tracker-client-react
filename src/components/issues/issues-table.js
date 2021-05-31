import {Link, useParams} from "react-router-dom";
import IssuesRow from "./issues-row";
import {connect} from "react-redux";
import {AiFillFileAdd, AiFillFolderAdd} from "react-icons/all";
import React, {useState} from "react";
import CreateProject from "../projects/create-project";
import Modal from "react-modal";
import CreateIssue from "./create-issue";
import {useMediaQuery} from 'react-responsive';
const IssuesTable = ({issues, projectId, userLoggedIn, getPaginatedItems, numItemsPerPage}) => {
    const [showCreateIssue, setShowCreateIssue] = useState(false)
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    console.log(issues)
    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            width: '60%',
            marginRight           : '-50%',
            padding : 0,
            transform             : 'translate(-50%, -50%)',
            border : '1px solid gray'
        },
        overlay: {zIndex: 1000}
    };
    return (
        <>
            <Modal style={customStyles} isOpen={showCreateIssue} onRequestClose={() => {
                setShowCreateIssue(false)
            }}>
            <CreateIssue setOpen={setShowCreateIssue}
                           numItemsPerPage={numItemsPerPage}
                           getPaginatedItems={getPaginatedItems}
            />
            </Modal>
            <div className="mt-3">
                {/*<h2>Issues Table</h2>*/}
                <table className="table table-striped border">
                    <thead style={{color: "navy"}}>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th className="d-none d-sm-table-cell">Type</th>
                        <th className="d-none d-sm-table-cell">Priority</th>
                        <th className="d-none d-sm-table-cell">Status</th>
                        <th>
                            {
                            userLoggedIn && (userLoggedIn.role.name === 'ADMIN' || userLoggedIn.role.name === 'MANAGER') &&

                            <div className={`on-track-icon pl-1 pr-1 pt-1 ${(isMobile? 'ml-n2 w-75' : 'float-right')}`}
                                 style={{
                                     border: "1px solid navy", display: "flex",
                                     background: "#1261a0", borderRadius: 4
                                 }}
                                 onClick={() => {
                                     setShowCreateIssue(true)
                                     // console.log(showCreateProject)
                                 }}>
                                <AiFillFileAdd className="mb-1" color="white" size="2em"/>
                                {
                                    !isMobile &&
                                    <div className="mt-1 ml-2 mr-2" style={{color: "white", whiteSpace: "nowrap"}}>Create
                                    Issue</div>
                                }
                            </div>
                            // <Link to={`${projectId}/create-issue`}>
                            //     <i className="text-danger fas btn fa-plus-circle float-right fa-2x"/>
                            // </Link>
                            }
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        issues.map((issue, i) =>
                            <IssuesRow
                                key={i}
                                issue={issue}/>)
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}
const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
export default connect(stpm)(IssuesTable)