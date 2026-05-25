import React, { useState } from "react";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faGridHorizontal, faUsers, faLayerGroup, faBox, faTags, faAngleRight, faAngleDown, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "../../store/actions/notifications";
import { useEffect } from "react";
import axiosInstance from "../../axios config/axiosinstance";

const AsideDashboard = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [categoriesShow, setCategoriesShow] = useState(false)
    const [productsShow, setProductsShow] = useState(false)
    const [ordersShow, setOrdersShow] = useState(false)
    const [usersShow, setUsersShow] = useState(false)
    const [offersShow, setOffersShow] = useState(false)
    const [msgsShow, setMsgsShow] = useState(false)

    const handleCategoriesList = () => {
        setCategoriesShow(!categoriesShow)
    }
    const handleProductsList = () => {
        setProductsShow(!productsShow)
    }
    const handleOrdersdList = () => {
        setOrdersShow(!ordersShow)
    }
    const handleUsersList = () => {
        setUsersShow(!usersShow)
    }
    const handleOffersList = () => {
        setOffersShow(!offersShow)
    }
    const handleMsgsList = () => {
        setMsgsShow(!msgsShow)
    }

    return (
        <>
            <aside className="col-3 col-md-2">
                {/* <div className="d-flex align-items-center dash-title">
                    <FontAwesomeIcon icon={faHome} className="home-logo"></FontAwesomeIcon>
                    <h2 className="mb-0 p-0">Cozy Corner</h2>
                </div> */}
                <div>
                    <ul className="d-flex flex-column dash-nav">
                        <li className="d-flex align-items-center main-list">
                            <FontAwesomeIcon icon={faGridHorizontal}></FontAwesomeIcon>
                            <Link to="/dashboard/home" className="main-link m-0"><div className="">Dashboard</div></Link>
                        </li>
                        <li className="d-flex align-items-center justify-content-between main-list" onClick={handleCategoriesList}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>
                                <div className="main-name">Categories</div>
                            </div>
                            <FontAwesomeIcon icon={categoriesShow ? faAngleDown : faAngleRight} className="icons"></FontAwesomeIcon>
                        </li>
                        {categoriesShow &&
                            <ul className="sub-list">
                                <li><Link to="/dashboard/categories" className="links m-0">Category List</Link></li>
                                <li><Link to="/dashboard/categories/add" className="links m-0">Add Category</Link></li>
                                <li><Link to="/dashboard/categories/delete" className="links m-0">Delete Category</Link></li>
                            </ul>}
                        <li className="d-flex align-items-center justify-content-between main-list" onClick={handleProductsList}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faBox}></FontAwesomeIcon>
                                <div className="main-name">Products</div>
                            </div>
                            <FontAwesomeIcon icon={productsShow ? faAngleDown : faAngleRight} className="icons"></FontAwesomeIcon>
                        </li>
                        {productsShow &&
                            <ul className="sub-list">
                                <li><Link to="/dashboard/products" className="links m-0">Product List</Link></li>
                                <li><Link to="/dashboard/products/add" className="links m-0">Add Product</Link></li>
                                <li><Link to="/dashboard/products/delete" className="links m-0">Delete Product</Link></li>
                            </ul>}
                        <li className="d-flex align-items-center justify-content-between main-list" onClick={handleOrdersdList}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                                <div className="main-name">Orders</div>
                            </div>
                            <FontAwesomeIcon icon={ordersShow ? faAngleDown : faAngleRight} className="icons"></FontAwesomeIcon>
                        </li>
                        {ordersShow &&
                            <ul className="sub-list">
                                <li><Link to="/dashboard/orders" className="links m-0">Orders List</Link></li>
                            </ul>}
                        <li className="d-flex align-items-center justify-content-between main-list" onClick={handleUsersList}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                                <div className="main-name">users</div>
                            </div>
                            <FontAwesomeIcon icon={usersShow ? faAngleDown : faAngleRight} className="icons"></FontAwesomeIcon>
                        </li>
                        {usersShow &&
                            <ul className="sub-list">
                                <li><Link to="/dashboard/users" className="links m-0">Users List</Link></li>
                                <li><Link to="/dashboard/user/add" className="links m-0">Add User</Link></li>
                            </ul>}
                        <li className="d-flex align-items-center justify-content-between main-list" onClick={handleOffersList}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faTags}></FontAwesomeIcon>
                                <div className="main-name">Offers</div>
                            </div>
                            <FontAwesomeIcon icon={offersShow ? faAngleDown : faAngleRight} className="icons"></FontAwesomeIcon>
                        </li>
                        {offersShow &&
                            <ul className="sub-list">
                                <li><Link to="/dashboard/offers" className="links m-0">Offers List</Link></li>
                                <li><Link to="/dashboard/offer/add" className="links m-0">Add Offer</Link></li>
                                <li><Link to="/dashboard/offer/delete" className="links m-0">Delete Offer</Link></li>
                            </ul>}
                        <li className="d-flex align-items-center justify-content-between main-list" onClick={handleMsgsList}>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faMessage}></FontAwesomeIcon>
                                <div className="main-name">Messages</div>
                            </div>
                            <FontAwesomeIcon icon={msgsShow ? faAngleDown : faAngleRight} className="icons"></FontAwesomeIcon>
                        </li>
                        {msgsShow &&
                            <ul className="sub-list">
                                <li><Link to="/dashboard/messages" className="links m-0">Messages List</Link></li>
                            </ul>}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default AsideDashboard;