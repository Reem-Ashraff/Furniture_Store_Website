import { Redirect } from "react-router-dom/cjs/react-router-dom";

export default function UserRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
        return <Redirect to="/login" />
    }

    // if (user.role !== "user" && user.role !== "driver") {
    //     return <Redirect to="/dashboard/home" />
    // }

    if (user.role === "admin" && user.role !== "user") {
        return <Redirect to="/dashboard/home" />
    }
    else if (user.role === "driver" && user.role !== "user") {
        return <Redirect to="/driver-page" />
    }

    return children;
}