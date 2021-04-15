const ISSUES_URL = "http://localhost:8080/api/issues";
const PROJECTS_URL = "http://localhost:8080/api/projects"

const findAllIssues = () =>
    fetch(ISSUES_URL)
        .then(response => response.json())

const findIssuesForProject = (projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}/issues`)
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
    createIssue,
    createIssueForProject,
    deleteIssue,
    findIssueById
}

export default IssuesService