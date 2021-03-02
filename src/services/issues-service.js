const ISSUES_URL = "https://wbdv-generic-server.herokuapp.com/api/001372648/issues";

const findAllIssues = () =>
    fetch(ISSUES_URL)
        .then(response => response.json())


const IssuesService = {
    findAllIssues
}

export default IssuesService