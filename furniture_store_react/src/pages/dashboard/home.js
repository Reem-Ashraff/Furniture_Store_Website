import React, { useState } from "react";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faUsers, faBox, faTags } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "../../store/actions/notifications";
import { useEffect } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import AsideDashboard from "./aside";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import DashHeader from "./dashHeader";
import FooterDashboard from "./footer";

const HomeDashboard = () => {

    const loading = useSelector((state) => state.loader.isLoading)
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const dispatch = useDispatch()
    const discountedProducts = useSelector((state) => state.sales.sales)
    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [activeOffers, setActiveOffers] = useState([])
    const [sales, setSales] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const uniqueOrders = [...new Map(allOrders.map(item => [item.order_id, item])).values()];

    useEffect(() => {
        axiosInstance.get("users")
            .then((res) => {
                setUsers(res.data)
            })
        axiosInstance.get("products")
            .then((res) => {
                setProducts(res.data)
            })
        axiosInstance.get("orders")
            .then((res) => {
                setOrders(res.data)
            })
        axiosInstance.get("activeSales")
            .then((res) => {
                setActiveOffers(res.data)
            })
        axiosInstance.get("allOrders")
            .then((response) => {
                setAllOrders(response.data)
            })
        axiosInstance.get("sales")
            .then((res) => {
                setSales(res.data)
            })
    }, [])

    return (
        <>
            <div className="d-flex">
                <AsideDashboard></AsideDashboard>
                <div className="col-9 col-md-10 page-wrapper">
                    <DashHeader></DashHeader>
                    <main className="category-main content">
                        {loading && <div className="d-flex justify-content-center overlay">
                            <div className="spinner-grow loader" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                        <section>
                            <h3 className="">Dashboard</h3>
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center margin-top">
                                <div className="mb-2 mb-md-0 d-flex justify-content-between align-items-center dash-card">
                                    <div>
                                        <h5>{users.length}</h5>
                                        <p>Total Users</p>
                                    </div>
                                    <FontAwesomeIcon icon={faUsers} className="dash-icon"></FontAwesomeIcon>
                                </div>
                                <div className="mb-2 mb-md-0 d-flex justify-content-between align-items-center dash-card">
                                    <div>
                                        <h5>{products.length}</h5>
                                        <p>Total Products</p>
                                    </div>
                                    <FontAwesomeIcon icon={faBox} className="dash-icon"></FontAwesomeIcon>
                                </div>
                                <div className="mb-2 mb-md-0 d-flex justify-content-between align-items-center dash-card">
                                    <div>
                                        <h5>{orders.length}</h5>
                                        <p>Total Orders</p>
                                    </div>
                                    <FontAwesomeIcon icon={faCartShopping} className="dash-icon"></FontAwesomeIcon>
                                </div>
                                <div className="d-flex justify-content-between align-items-center dash-card">
                                    <div>
                                        <h5>{activeOffers.length}</h5>
                                        <p>Active Offers</p>
                                    </div>
                                    <FontAwesomeIcon icon={faTags} className="dash-icon"></FontAwesomeIcon>
                                </div>
                            </div>
                        </section>

                        <section className="section-margin dash-section">
                            <h3>Latest Orders</h3>
                            <div className="d-flex justify-content-center">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th className="col-4 order-code">Order Code</th>
                                            <th className="col-3">Customer</th>
                                            <th className="col-2">Total</th>
                                            <th className="col-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uniqueOrders.slice(0, 6).map((order) => {
                                            const items = orders.filter((item) => order.order_id == item.order_id)
                                            return (
                                                <tr key={order.order_id}>
                                                    <td className="order-code code-td">
                                                        <Link to={`order/details/${order.order_id}`} className="code-td">#{order.order_code}</Link>
                                                    </td>
                                                    <td className="">{order.username}</td>
                                                    <td className="">{order.total_price}</td>
                                                    <td className={order.status=="cancelled"?"red":order.status=="completed"?"green":order.status=="pending"?"yellow":"orange"}>{order.status}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="section-margin dash-section">
                            <h3>Latest Products</h3>
                            <div className="d-flex justify-content-center">
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th className="col-4 order-code">Product</th>
                                            <th className="col-1">Price</th>
                                            <th className="col-1">Sale</th>
                                            <th className="col-2">Stock Status</th>
                                            <th className="col-2">Category</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...products].reverse().slice(0, 6).map((product) => {
                                            const discountedProduct = discountedProducts.find((item) => item.product_id == product.id)
                                            console.log(discountedProduct)
                                            return (
                                                <tr key={product.id}>
                                                    <td className="d-flex align-items-center order-code">
                                                        <Link to={`product/details/${product.id}`} className="link">
                                                            <div className="d-flex align-items-center w-100 product">
                                                                <img src={baseUrl + product.image} className="h-auto" />
                                                                <div className="">{product.product_name}</div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="">${product.price}</td>
                                                    {discountedProduct ?
                                                        <td className="">${discountedProduct.discount_type == "percentage" ? (product.price * (100 - discountedProduct.discount_value)) / 100 : product.price - discountedProduct.discount_value}</td> :
                                                        <td>${product.price}</td>
                                                    }
                                                    <td className={(product.stock == 0) ? "red" : "green"}>{(product.stock == 0) ? "Sold out" : "In Stock"}</td>
                                                    <td className="">{product.category_name}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section className="section-margin dash-section">
                            <h3>Offers Status</h3>
                            <div className="d-flex justify-content-center">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th className="col-3 order-code">Title</th>
                                            <th className="col-2">Discount</th>
                                            <th className="col-3">Status</th>
                                            {/* <th className="col-2">Products Count</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((sale) => {
                                            const now = new Date();
                                            const startDate = new Date(sale.start_date);
                                            const endDate = new Date(sale.end_date);
                                            // const products = saleProducts.filter((item) => sale.id == item.sale_id)
                                            return (
                                                <tr key={sale.id}>
                                                    <td className="order-code">{sale.title}</td>
                                                    <td className="">{sale.discount_type == "percentage" ? `${parseFloat(sale.discount_value)}%` : `$${parseFloat(sale.discount_value)}`}</td>
                                                    <td className={now >= startDate && now <= endDate ? "green" : "red"}>{now >= startDate && now <= endDate ? "Active" : "Expired"}</td>
                                                    {/* <td className="">{products.length}</td> */}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </main>
                    <FooterDashboard></FooterDashboard>
                </div>
            </div >
        </>
    )
}

export default HomeDashboard;