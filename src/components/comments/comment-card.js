import React, {useState} from "react";
import './comment-style.scss'
import {IoIosSave, MdCancel, MdEdit} from "react-icons/all";
import {connect} from "react-redux";

const CommentCard = ({comment, updateComment, userLoggedIn}) => {
    const [editing, setEditing] = useState(false)
    const [textboxContent, setTextboxContent] = useState(comment.text)
    const getDateTime = (unixTime) => {
        let time = new Date(unixTime);
        return `${time.toLocaleTimeString()}, ${time.toLocaleDateString()}`
    }
    return (
        <div className="mt-2 mb-3 mr-3 w-75">
            <div className="card comment-text">
                <div className="card-header comment-box-padding comment-header font-weight-bold">
                    {comment.user.id === userLoggedIn.id ?
                        <span style={{color: "#ba2f2f"}}>YOU</span>: comment.user.username}
                    {
                        !editing && comment.user.id === userLoggedIn.id &&
                        <MdEdit className="float-right on-track-icon" size="1.5rem" onClick={() => {
                            setEditing(true)
                        }}/>
                    }
                    {
                        editing &&
                        <>
                        <MdCancel className="float-right on-track-icon" size="1.5em" style={{color: "#ba2f2f"}}
                                  onClick={
                                      () => {
                                          setEditing(false)
                                          setTextboxContent(comment.text)
                                      }
                                  }/>
                        <IoIosSave className="float-right on-track-icon mr-1" size="1.5rem" onClick={() => {
                            setEditing(false)
                            updateComment({...comment, text: textboxContent}).then((r) => null)
                        }}/>
                        </>
                    }
                </div>

                {editing && <textarea className="form-control"
                                      placeholder="Add a comment..."
                                      value={textboxContent}
                                      autoFocus={true}
                                      onChange={(e) => setTextboxContent(e.target.value)}
                                      rows="2"/>}
                {!editing &&
                <div className="card-body comment-box-padding">
                    <p>{textboxContent}</p>
                    <footer className="blockquote-footer">
                        <cite title="Source Title">
                            {comment.creationTime ? getDateTime(comment.creationTime) : ''}
                            {comment.edited ? ' [Edited]': ''}
                        </cite>
                    </footer>
                </div>}
            </div>
        </div>
    )
}

const stpm = (state) => ({userLoggedIn: state.session.userLoggedIn})
export default connect(stpm)(CommentCard)