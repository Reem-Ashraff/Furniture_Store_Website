import { Redirect } from "react-router-dom/cjs/react-router-dom";

export default function AdminRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
        return <Redirect to="/login" />
    }

    // if (user.role !== "admin") {
    //     return <Redirect to="/home" />
    // }

    if (user.role === "user" && user.role !== "admin") {
        return <Redirect to="/home" />
    }
    else if (user.role === "driver" && user.role !== "admin") {
        return <Redirect to="/driver-page" />
    }


    return children;
}