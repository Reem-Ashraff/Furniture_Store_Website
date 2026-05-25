let storedUser = null;

try {
    const data = localStorage.getItem("userData");
    storedUser = data ? JSON.parse(data) : null;
} catch (error) {
    storedUser = null;
}

const Initial_State = {
    userData: storedUser
}

export default function userReducer(state = Initial_State, action) {
    switch (action.type) {
        case "SET_USER":
            localStorage.setItem("userData", JSON.stringify(action.payload))
            return {
                ...state,
                userData: action.payload
            }
        case "LOGOUT":
            localStorage.removeItem("userData");
            return {
                ...state,
                userData: null
            };
        default:
            return state
    }
}