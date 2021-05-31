const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL
const ISSUES_URL = `${SERVER_API_URL}/issues`;
const PROJECTS_URL = `${SERVER_API_URL}/projects`
const USERS_URL = `${SERVER_API_URL}/users`

const findAllIssues = () =>
    fetch(ISSUES_URL)
        .then(response => response.json())

const findIssuesForProject = (projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}/issues`)
        .then(response => response.json())

const findPaginatedIssuesForProject = (projectId, pageNum, pageSize) =>
    fetch(`${PROJECTS_URL}/${projectId}/issues?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())


const findIssuesForUser = (userId) =>
    fetch(`${USERS_URL}/${userId}/issues`)
        .then(response => response.json())

const findPaginatedIssuesForUser = (userId, pageNum, pageSize, isOpen) =>
    fetch(`${USERS_URL}/${userId}/issues?pageNum=${pageNum}&pageSize=${pageSize}&open=${isOpen}`)
        .then(response => response.json())

const findMatchingIssuesForUser = (userId, descriptionString) =>
    fetch(`${USERS_URL}/${userId}/issues?description=${descriptionString}`)
        .then(response => response.json())

const findPaginatedMatchingIssuesForUser = (userId, descriptionString, pageNum, pageSize, isOpen) =>
    fetch(`${USERS_URL}/${userId}/issues?description=${descriptionString}&pageNum=${pageNum}&pageSize=${pageSize}&open=${isOpen}`)
        .then(response => response.json())

const findIssueById = (issueId) =>
    fetch(`${ISSUES_URL}/${issueId}`)
        .then(response => response.json())

const createIssue = (issue) =>
    fetch(ISSUES_URL, {
        method: 'POST',
        body: JSON.stringify(issue),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const createIssueForProject = (issue, projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}/issues`, {
        method: 'POST',
        body: JSON.stringify(issue),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

const updateIssue = (issueId, issue) => {
    console.log(JSON.stringify(issue))
    return fetch(`${ISSUES_URL}/${issueId}`, {
        method: 'PUT',
        body: JSON.stringify(issue),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const deleteIssue = (issueId) =>
    fetch(
        `${ISSUES_URL}/${issueId}`, {
            method: 'DELETE'
        }
    ).then(response => response.json())


const IssuesService = {
    findAllIssues,
    findIssuesForProject,
    findIssuesForUser,
    findPaginatedIssuesForUser,
    findMatchingIssuesForUser,
    findPaginatedMatchingIssuesForUser,
    createIssue,
    createIssueForProject,
    updateIssue,
    deleteIssue,
    findIssueById,
    findPaginatedIssuesForProject
}

export default IssuesService