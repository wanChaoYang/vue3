export default {
    LOGIN_IN(state, token): void {
        // state.userToken = token
        localStorage.setItem("userToken", token)
    },
    LOGIN_OUT(state, token): void {
        // state.userToken = ''
        localStorage.removeItem("userToken")
    }
}