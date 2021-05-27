const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL
const LOGIN_URL = `${SERVER_API_URL}/login`;
const REGISTER_URL = `${SERVER_API_URL}/register`
const PROFILE_URL = `${SERVER_API_URL}/profile`
const LOGOUT_URL = `${SERVER_API_URL}/logout`

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