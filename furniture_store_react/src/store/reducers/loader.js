const Initial_State = {
    isLoading: false
}

export default function loaderReducer(state = Initial_State, action) {
    switch (action.type) {
        case "SET_LOADER":
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}