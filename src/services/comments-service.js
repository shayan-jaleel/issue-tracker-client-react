const ISSUES_URL = "http://localhost:8080/api/issues";
const COMMENTS_URL = "http://localhost:8080/api/comments"
const USERS_URL = "http://localhost:8080/api/users"

const findAllComments = () =>
    fetch(COMMENTS_URL)
        .then(response => response.json())

const findCommentsForIssue = (issueId) =>
    fetch(`${ISSUES_URL}/${issueId}/comments`)
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

const commentsService = {
    findAllComments,
    findCommentsForIssue,
    findCommentsForUser,
    postComment
}

export default commentsService