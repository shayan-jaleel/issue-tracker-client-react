const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL
const ISSUES_URL = `${SERVER_API_URL}/issues`;
const COMMENTS_URL = `${SERVER_API_URL}/comments`;
const USERS_URL = `${SERVER_API_URL}/api/users`

const findAllComments = () =>
    fetch(COMMENTS_URL)
        .then(response => response.json())

const findCommentsForIssue = (issueId) =>
    fetch(`${ISSUES_URL}/${issueId}/comments`)
        .then(response => response.json())

const findPaginatedCommentsForIssue = (issueId, pageNum, pageSize) =>
    fetch(`${ISSUES_URL}/${issueId}/comments?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())


const findCommentsForUser = (userId) =>
    fetch(`${USERS_URL}/${userId}/comments`)
        .then(response => response.json())

const postComment = (issueId, userId, comment) => {
    console.log(comment)
    return fetch(`${ISSUES_URL}/${issueId}/users/${userId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
}

const updateComment = (commentId, comment) => {
    // console.log(JSON.stringify(comment))
    return fetch(`${COMMENTS_URL}/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const deleteComment = (commentId) =>
    fetch(
        `${COMMENTS_URL}/${commentId}`, {
            method: 'DELETE'
        }
    ).then(response => response.json())



const commentsService = {
    findAllComments,
    findCommentsForIssue,
    findPaginatedCommentsForIssue,
    findCommentsForUser,
    postComment,
    updateComment,
    deleteComment
}

export default commentsService