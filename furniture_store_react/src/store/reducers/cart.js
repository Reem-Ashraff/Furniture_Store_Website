const Initial_State = {
    cartItems: JSON.parse(localStorage.getItem("cart"))||""
}

export default function cartReducer(state = Initial_State, action) {
    switch (action.type) {
        case "SET_CART":
            localStorage.setItem("cart",JSON.stringify(action.payload))
            return {
                ...state,
                cartItems: action.payload
            }
        default:
            return state
    }
}