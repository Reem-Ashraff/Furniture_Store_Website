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

const FooterDashboard = () => {
    return (
        <>
            <footer className="dash-footer py-3">
                {/* <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <Link to="/" className="nav-link"><li className="nav-item">Home</li></Link>
                    <Link className="nav-link"><li className="nav-item">Features</li></Link>
                    <Link className="nav-link"><li className="nav-item">Pricing</li></Link>
                    <Link className="nav-link"><li className="nav-item">FAQs</li></Link>
                    <Link to="/about" className="nav-link"><li className="nav-item">About</li></Link>
                </ul> */}
                <p className="text-center mb-0">© 2026 Furniture Store, Inc</p>
            </footer>
        </>
    )
}

export default FooterDashboard;