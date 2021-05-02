import React from "react";
import './comment-style.scss'

const CommentCard = ({author, text, date}) => {
    return (
        <div className="mt-2 mb-5 mr-3">
            <div className="card comment-text">
                <div className="card-header comment-box-padding comment-header font-weight-bold">
                    {author}
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