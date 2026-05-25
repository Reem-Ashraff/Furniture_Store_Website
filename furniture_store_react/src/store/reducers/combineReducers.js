import { combineReducers } from "redux";
import loaderReducer from "./loader";
import userReducer from "./user";
import favoritesReducer from "./favorites";
import cartReducer from "./cart";
import salesReducer from "./sales";
import notificationsReducer from "./notifications";

export default combineReducers({
    loader: loaderReducer,
    user: userReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    sales : salesReducer,
    notifications : notificationsReducer
})
