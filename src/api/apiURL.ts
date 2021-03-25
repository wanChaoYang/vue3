import axios from '../common/js/server.js'

export function login(user: string): string {
    return axios.get("/api/login?user=" + user)
}