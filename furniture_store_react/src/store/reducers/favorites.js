const Initial_State = {
    favorites: JSON.parse(localStorage.getItem("favorites"))||""
}

export default function favoritesReducer(state = Initial_State, action) {
    switch (action.type) {
        case "SET_FAVORITES":
            localStorage.setItem("favorites",JSON.stringify(action.payload))
            return {
                ...state,
                favorites: action.payload
            }
        default:
            return state
    }
}