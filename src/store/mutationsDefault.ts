export default {
    LOGIN_IN(state, token) {
        state.token = token
    },
    LOGIN_OUT(state, token) {
        state.token = ''
    }
}