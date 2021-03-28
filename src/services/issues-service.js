const ISSUES_URL = "https://wbdv-generic-server.herokuapp.com/api/001372648/issues";
const PROJECTS_URL = "https://wbdv-generic-server.herokuapp.com/api/001372648/projects"

const findAllIssues = () =>
    fetch(ISSUES_URL)
        .then(response => response.json())

const findIssuesForProject = (projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}/issues`)
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
    deleteIssue
}

export default IssuesService