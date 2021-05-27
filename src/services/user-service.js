const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL
const USERS_URL = `${SERVER_API_URL}/users`;
const ROLES_URL = `${SERVER_API_URL}/roles`;
const PROJECTS_URL = `${SERVER_API_URL}/projects`;

const findAllUsers = () => {
    console.log('reached findAllUsers()')
    return fetch(USERS_URL)
        .then(response => {
            return response.json()
        })
}

const findUserById = (userId) => {
    console.log('reached findUserById')
    // console.log(userId)
    return fetch(`${USERS_URL}/${userId}`)
        .then(response => {
            return response.json()
        })
}

const findUsersForProject = (projectId) => {
    return fetch(`${PROJECTS_URL}/${projectId}/users`)
        .then(response => {
            return response.json()
        })
}


const createUserForRole = (user, roleId) =>
    fetch(`${ROLES_URL}/${roleId}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const updateUser = (userId, user) => {
    // console.log(JSON.stringify(user))
    return fetch(`${USERS_URL}/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const updateUserForRole = (userId, roleId, user) => {
    // console.log(JSON.stringify(user))
    // console.log(JSON.stringify(roleId))
    return fetch(`${ROLES_URL}/${roleId}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const deleteUser = (userId) =>
    fetch(`${USERS_URL}/${userId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())

const addUserToProject = (projectId, userId) =>
    fetch(`${PROJECTS_URL}/${projectId}/users/${userId}`)
        .then(response => {
            return response.json()
    })

const removeUserFromProject = (projectId, userId) =>
    fetch(`${PROJECTS_URL}/${projectId}/users/${userId}`, {
        method: 'DELETE'
    })
        .then(response => {
            return response.json()
        })

const userService = {
    createUserForRole,
    findAllUsers,
    updateUser,
    updateUserForRole,
    deleteUser,
    findUserById,
    findUsersForProject,
    addUserToProject,
    removeUserFromProject
}

export default userService



