import commentsService from "../../services/comments-service";
import CommentCard from "./comment-card";
import React, {useEffect, useState} from "react";

const CommentList = ({userLoggedIn, issueId}) => {
    const [writtenComment, setWrittenComment] = useState('')
    const [commentInFocus, setCommentInFocus] = useState(false)
    const [comments, setComments] = useState(null)
    const [numCommentsPerPage, setNumCommentsPerPage] = useState(5)
    const [commentsMeta, setCommentsMeta] = useState(null)
    useEffect(() => {
        getComments()
    }, [userLoggedIn])

    const postComment = () => {
        let createdComment = {
            text: writtenComment,
            creationTime: Date.now()
        }
        commentsService.postComment(issueId, userLoggedIn.id, createdComment)
            .then(returnedComment => {
                setWrittenComment('')
                setComments([...comments, returnedComment])
                getPaginatedComments(1, numCommentsPerPage)
            })
    }
    const updateComment = (comment) => commentsService.updateComment(comment.id, comment)
        .then((returnedComment) => {
            comment.text = returnedComment.text
            comment.edited = returnedComment.edited
        })
    const getComments = () => {
        if(!comments) {
            commentsService.findCommentsForIssue(issueId).then((commentsPage) => {
                setComments(commentsPage.items)
                setCommentsMeta({
                    currentPage: commentsPage.currentPage,
                    totalPages: commentsPage.totalPages,
                    totalItems: commentsPage.totalItems,
                    pageSize: commentsPage.pageSize
                })
            })
        }
    }
    const getPaginatedComments = (pageNum, pageSize) => {
        commentsService.findPaginatedCommentsForIssue(issueId, pageNum, pageSize).then((commentsPage) => {
            setComments(commentsPage.items)
            setCommentsMeta({
                currentPage: commentsPage.currentPage,
                totalPages: commentsPage.totalPages,
                totalItems: commentsPage.totalItems,
                pageSize: commentsPage.pageSize
            })
        })
    }
    return (

        <div>
            {
            <div className="border-bottom">
                <textarea className="form-control mb-2 mt-4"
                  onChange={(e) => setWrittenComment(e.target.value)}
                  onFocus={() => setCommentInFocus(true)}
                  onBlur={() => setCommentInFocus(false)}
                  value={writtenComment}
                  placeholder="Add a comment..."
                  rows="3"/>
                {
                    commentInFocus &&
                    <button className="on-track-btn-active mb-3"
                        onMouseDown={event => event.preventDefault()}
                        onClick={() => postComment()}>Post
                    </button>}
            </div>
            }
            {
                comments && comments.length > 0 &&
                <div className="mt-4 mb-3">
                    Show
                    <select onChange={(e) => {
                        let selectedVal = parseInt(e.target.value)
                        setNumCommentsPerPage(selectedVal)
                        getPaginatedComments( 1, selectedVal)
                    }}
                            value={numCommentsPerPage}
                            className="mr-2 ml-2"
                            style={{width: "3rem"}}>
                        <option value= '5'>5</option>
                        <option value= '10'>10</option>
                        <option value= '15'>15</option>
                    </select>
                    entries
                </div>
            }
            {
                comments &&
                    comments.map((comment) =>
                        <div className="" key={comment.id}>
                            <CommentCard comment={comment} updateComment={updateComment}/>
                        </div>)
            }
            {
                comments && comments.length > 0 &&
                <div className="">
                    {
                        commentsMeta &&
                        <div>
                            Showing <span>{(commentsMeta.currentPage - 1) * commentsMeta.pageSize + 1}</span>
                            <span className="ml-1 mr-1">to {Math.min(commentsMeta.totalItems,
                                (commentsMeta.currentPage) * commentsMeta.pageSize)}
                            </span>
                            <span>of {commentsMeta.totalItems} comments</span>
                        </div>
                    }
                    {
                        commentsMeta &&
                        <div>
                            {commentsMeta.currentPage !== commentsMeta.totalPages
                            &&
                            <button className="float-right mt-n4 mb-3 ml-2" onClick={() =>
                                getPaginatedComments(commentsMeta.currentPage+1, 5)}>
                                Next
                            </button>
                            }
                            <div className="float-right mt-n4 mb-3 ml-2"> {commentsMeta.currentPage}</div>
                            {commentsMeta.currentPage !== 1 &&
                            <button className="float-right mt-n4 mb-3" onClick={() =>
                                getPaginatedComments(commentsMeta.currentPage-1, 5)}>
                                Previous
                            </button>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
};

export default CommentList