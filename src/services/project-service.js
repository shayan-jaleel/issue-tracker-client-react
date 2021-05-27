const PROJECTS_URL = "https://issue-tracker-java-server.herokuapp.com/api/projects";
const USERS_URL = "https://issue-tracker-java-server.herokuapp.com/api/users"

const findAllProjects = () =>
    fetch(PROJECTS_URL)
        .then(response => response.json())

const findAllPaginatedProjects = (pageNum, pageSize) =>
    fetch(`${PROJECTS_URL}?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())

const findProject = (projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}`)
        .then(response => response.json())

const findProjectsForUser = (userId) => {
    console.log('reached findProjectsForUser')
    console.log(userId)
    return fetch(`${USERS_URL}/${userId}/projects`)
        .then(response => response.json())
}

const findPaginatedIssuesForProject = (projectId, pageNum, pageSize) =>
    fetch(`${PROJECTS_URL}/${projectId}/users-p?pageNum=${pageNum}&pageSize=${pageSize}`)
        .then(response => response.json())

const createProject = (project) =>
    fetch(PROJECTS_URL, {
        method: 'POST',
        body: JSON.stringify(project),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const updateProject = (projectId, project) =>
    fetch(`${PROJECTS_URL}/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(project),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

const deleteProject = (projectId) =>
    fetch(`${PROJECTS_URL}/${projectId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())


const projectService = {
    createProject,
    updateProject,
    findProject,
    findAllProjects,
    findAllPaginatedProjects,
    deleteProject,
    findProjectsForUser,
    findPaginatedIssuesForProject
}

export default projectService