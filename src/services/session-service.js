const LOGIN_URL = "http://localhost:8080/api/login";
const REGISTER_URL = "http://localhost:8080/api/register"
const PROFILE_URL = "http://localhost:8080/api/profile"
const LOGOUT_URL = "http://localhost:8080/api/logout"

const profile = () =>
    fetch(PROFILE_URL)
        .then(response => response.json())


const login = (user) =>
    fetch(LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const register = (user) =>
    fetch(REGISTER_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => {
        console.log(response)
        return response.json()
    })

const logout = () =>
    fetch(LOGOUT_URL, {
        method: 'POST',
        body: '',
        headers: {
            'content-type' : 'application/json'
        }
    }).then(response => response.json())

const sessionService = {
    profile,
    login,
    register,
    logout
}

export default sessionService