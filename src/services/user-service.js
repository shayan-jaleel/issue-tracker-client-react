const USERS_URL = "https://wbdv-generic-server.herokuapp.com/api/001372648/it-users";

const findAllUsers = () =>
    fetch(USERS_URL)
        .then(response => response.json())

const createUser = (user) =>
    fetch(USERS_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const updateUser = (userId, user) =>
    fetch(`${USERS_URL}/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

const deleteUser = (userId) =>
    fetch(`${USERS_URL}/${userId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())


const userService = {
    createUser,
    findAllUsers,
    updateUser,
    deleteUser
}

export default userService



