const Initial_State = {
    sales: JSON.parse(localStorage.getItem("sales"))||""
}

export default function salesReducer(state = Initial_State, action) {
    switch (action.type) {
        case "SET_SALES":
            localStorage.setItem("sales",JSON.stringify(action.payload))
            return {
                ...state,
                sales: action.payload
            }
        default:
            return state
    }
}