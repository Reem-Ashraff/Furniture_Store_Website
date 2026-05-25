import { Redirect } from "react-router-dom/cjs/react-router-dom";

export default function DriverRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("userData"));

    if(!user){
        return <Redirect to="/login"/>
    }

    if(user.role === "admin" && user.role !== "driver"){
        return <Redirect to="/dashboard/home"/>
    }
    else if (user.role === "user" && user.role !== "driver") {
        return <Redirect to="/home" />
    }

    return children;
}