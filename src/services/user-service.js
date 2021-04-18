const USERS_URL = "http://localhost:8080/api/users";

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


const createUser = (user) =>
    fetch(USERS_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const updateUser = (userId, user) => {
    return fetch(`${USERS_URL}/${userId}`, {
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
    createUser,
    findAllUsers,
    updateUser,
    deleteUser,
    findUserById
}

export default userService



