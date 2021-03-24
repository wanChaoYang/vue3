export default {
    get userToken() {
        return localStorage.getItem("token")
    },
    set userToken(value) {
        // return localStorage.setItem("token", value)
    }
}