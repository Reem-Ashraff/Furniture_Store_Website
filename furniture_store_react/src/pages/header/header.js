import React from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "../../store/actions/notifications";
import { useEffect } from "react";
import axiosInstance from "../../axios config/axiosinstance";

const Header = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const favoriteItems = useSelector((state) => state.favorites.favorites)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const user_notifications = useSelector((state) => state.notifications.notifications)
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.user.userData.id)
    const not_readed = user_notifications.filter(n => n.is_read === 0)
    var show = false
    if(not_readed.length > 0){
        show = true
    }
    else{
        show = false
    }

    const changeIsRead = () => {
        axiosInstance.get(`readed/${userId}`)
            .then((res) => {
                axiosInstance.get(`notifications/${userId}`)
                    .then((res) => {
                        dispatch(notifications(res.data))
                    })
            })
    }

    useEffect(() => {
        axiosInstance.get(`notifications/${userId}`)
            .then((res) => {
                dispatch(notifications(res.data))
            })
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <div className="d-flex align-items-center navbar-brand title">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faHome} className="icon"></FontAwesomeIcon>
                        </div>
                        <div className="d-flex align-items-center">
                            <h1 className="">Furniture Store</h1>
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse links" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="nav-link active-link-header" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="nav-link active-link-header" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="nav-link active-link-header" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="nav-link active-link-header" to="/contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" activeClassName="nav-link active-link-header" to="/sales">Sales</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center">
                        <Link to="/notifications"><FontAwesomeIcon icon={faBell} className="header-icon" onClick={changeIsRead}></FontAwesomeIcon></Link>{show && <sub>{not_readed.length}</sub>}
                        <Link to="/favorites"><FontAwesomeIcon icon={faHeart} className="header-icon"></FontAwesomeIcon></Link><sub>{favoriteItems.length}</sub>
                        <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} className="header-icon"></FontAwesomeIcon></Link><sub>{cartItems.length}</sub>
                        <Link to="/profile-dashboard"><FontAwesomeIcon icon={faUser} className="header-icon"></FontAwesomeIcon></Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;