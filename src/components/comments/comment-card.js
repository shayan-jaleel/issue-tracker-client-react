import React from "react";
import './comment-style.scss'
import {RiEdit2Fill} from "react-icons/all";

const CommentCard = ({author, text, date, userLoggedIn}) => {
    return (
        <div className="mt-2 mb-3 mr-3">
            <div className="card comment-text">
                <div className="card-header comment-box-padding comment-header font-weight-bold">
                    {author}
                    <RiEdit2Fill className="float-right"/>
                </div>
                <div className="card-body comment-box-padding" >
                    <p>{text}</p>
                    <footer className="blockquote-footer">
                        <cite title="Source Title">{date? date: 'Date here'}</cite></footer>
                </div>
            </div>
        </div>
    )
}

export default CommentCard