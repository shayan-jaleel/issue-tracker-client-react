const ISSUES_URL = "https://wbdv-generic-server.herokuapp.com/api/001372648/issues";

const findAllIssues = () =>
    fetch(ISSUES_URL)
        .then(response => response.json())

const createIssue = (issue) =>
    fetch(ISSUES_URL, {
        method: 'POST',
        body: JSON.stringify(issue),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())


const IssuesService = {
    findAllIssues,
    createIssue
}

export default IssuesService