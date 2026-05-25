export function user(data) {
    return {
        type: "SET_USER",
        payload: data
    }
}

export function logout() {
    return {
        type: "LOGOUT"
    }
}