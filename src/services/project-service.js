const PROJECTS_URL = "https://wbdv-generic-server.herokuapp.com/api/001372648/it-projects";

const findAllProjects = () =>
    fetch(PROJECTS_URL)
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
    findAllProjects,
    deleteProject
}

export default projectService