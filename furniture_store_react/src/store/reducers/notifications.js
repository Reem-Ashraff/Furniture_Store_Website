const Initial_State = {
    notifications: JSON.parse(localStorage.getItem("notifications"))||""
}

export default function notificationsReducer(state = Initial_State, action) {
    switch (action.type) {
        case "SET_NOTIFICATIONS":
            localStorage.setItem("notifications",JSON.stringify(action.payload))
            return {
                ...state,
                notifications: action.payload
            }
        default:
            return state
    }
}