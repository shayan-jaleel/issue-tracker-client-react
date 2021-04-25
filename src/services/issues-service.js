const ISSUES_URL = "http://localhost:8080/api/issues";
const PROJECTS_URL = "http://localhost:8080/api/projects"
const USERS_URL = "http://localhost:8080/api/users"

const findAllIssues = () =>
    fetch(ISSUES_URL)
        .then(response => response.json())

const findIssuesForProject = (projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}/issues`)
        .then(response => response.json())


const findIssuesForUser = (userId) =>
    fetch(`${USERS_URL}/${userId}/issues`)
        .then(response => response.json())

const findMatchingIssuesForUser = (userId, descriptionString) =>
    fetch(`${USERS_URL}/${userId}/issues?description=${descriptionString}`)
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
    findMatchingIssuesForUser,
    createIssue,
    createIssueForProject,
    deleteIssue,
    findIssueById
}

export default IssuesService