import React, { useState } from "react";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faGridHorizontal, faUsers, faLayerGroup, faBox, faTags, faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "../../store/actions/notifications";
import { useEffect } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { logout } from "../../store/actions/user";

const DashHeader = () => {

    const username = useSelector((state) => state.user.userData.username)
    const history = useHistory()
    const dispatch = useDispatch();

    const handleLogout = () => {
            dispatch(logout());
            history.push("/login");
        };

    return (
        <>
            <header className="d-flex align-items-center justify-content-between dash-header">
                <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faHome} className="home-logo"></FontAwesomeIcon>
                    <h2 className="mb-0 p-0">Furniture Store</h2>
                </div>
                <div className="d-flex align-items-center">
                    <div className="logout" onClick={handleLogout}>Logout</div>
                    <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={faUser} className="user-logo"></FontAwesomeIcon>
                        <div className="admin-name">{username}</div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default DashHeader;