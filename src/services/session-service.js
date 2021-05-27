const LOGIN_URL = "https://issue-tracker-java-server.herokuapp.com/api/login";
const REGISTER_URL = "https://issue-tracker-java-server.herokuapp.com/api/register"
const PROFILE_URL = "https://issue-tracker-java-server.herokuapp.com/api/profile"
const LOGOUT_URL = "https://issue-tracker-java-server.herokuapp.com/api/logout"

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
        return response.json()
    })

const logout = () =>
    fetch(LOGOUT_URL, {
        method: 'POST',
        body: '',
        headers: {
            'content-type' : 'application/json'
        }
    })//.then(response => response.json())

const sessionService = {
    profile,
    login,
    register,
    logout
}

export default sessionService