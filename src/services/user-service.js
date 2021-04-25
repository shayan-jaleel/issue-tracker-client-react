const USERS_URL = "http://localhost:8080/api/users";
const ROLES_URL = "http://localhost:8080/api/roles";

const findAllUsers = () =>
    fetch(USERS_URL)
        .then(response => response.json())

const findUserById = (userId) => {
    console.log('reached findUserById')
    console.log(userId)
    return fetch(`${USERS_URL}/${userId}`)
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
    console.log(JSON.stringify(user))
    return fetch(`${USERS_URL}/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const updateUserForRole = (userId, roleId, user) => {
    console.log(JSON.stringify(user))
    console.log(JSON.stringify(roleId))
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


const userService = {
    createUserForRole,
    findAllUsers,
    updateUser,
    updateUserForRole,
    deleteUser,
    findUserById
}

export default userService



