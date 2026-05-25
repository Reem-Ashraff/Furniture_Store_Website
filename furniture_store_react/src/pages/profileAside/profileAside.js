import React, { useEffect, useState } from "react";
import "./profileAside.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import axiosInstance from "../../axios config/axiosinstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "../../assets/Seito-Wood-Table.jpg";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import { logout } from "../../store/actions/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ProfileAside = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout());
        history.push("/login");
    };

    return (
        <>
            <div className="profile-aside d-flex flex-md-column col-12 col-md-3">
                <NavLink to="/profile-dashboard" className="aside-link me-2 me-md-0" activeClassName="active-link me-2 me-md-0">
                Dashboard
                </NavLink>
                <NavLink to="/orders" className="aside-link me-2 me-md-0" activeClassName="active-link me-2 me-md-0">
                    Orders
                </NavLink>
                <NavLink to="/details" className="aside-link me-2 me-md-0" activeClassName="active-link me-2 me-md-0">
                    Account Details
                </NavLink>
                <button to="/products" className="aside-link" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </>
    )
}

export default ProfileAside;