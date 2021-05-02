import commentsService from "../../services/comments-service";
import CommentCard from "./comment-card";
import React, {useEffect, useState} from "react";

const CommentList = ({userLoggedIn, issueId}) => {
    const [writtenComment, setWrittenComment] = useState('')
    const [commentInFocus, setCommentInFocus] = useState(false)
    const [comments, setComments] = useState(null)
    useEffect(() => {
        getComments()
    }, [userLoggedIn])

    const updateComment = (comment) => commentsService.updateComment(comment.id, comment)
    const getComments = () => {
        if(!comments) {
            commentsService.findCommentsForIssue(issueId).then((comments) => {
                setComments(comments)
            })
        }
    }
    return (

        <div className="">
            {
            <div>
                <textarea className="form-control mb-2 mt-4 w-75"
                  onChange={(e) => setWrittenComment(e.target.value)}
                  onFocus={() => setCommentInFocus(true)}
                  onBlur={() => setCommentInFocus(false)}
                  value={writtenComment}
                  placeholder="Add a comment..."
                  rows="3"/>
                {
                    commentInFocus &&
                    <div className=" btn on-track-btn-active mb-4"
                        onMouseDown={event => event.preventDefault()}
                        onClick={() => {
                            commentsService.postComment(issueId, userLoggedIn.id, {text: writtenComment})
                                .then(returnedComment => {
                                    setWrittenComment('')
                                    setComments([...comments, returnedComment])
                                })
                        }}>Post
                    </div>}
            </div>
            }
            {comments &&
            comments.map((comment) => <div className="" key={comment.id}>
                <CommentCard comment={comment} updateComment={updateComment}/>
            </div>)}
        </div>
    )
}

export default CommentList