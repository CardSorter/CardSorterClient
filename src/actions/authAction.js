export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const LOGOUT = 'LOGOUT'

// Action creators //

export function login(username, password) {
  return {
    type: LOGIN,
    payload: {
      username: username,
      password: password
    },
    error: false,
  }
}

export function register(username) {
  
}

export function logout() {
  
}
