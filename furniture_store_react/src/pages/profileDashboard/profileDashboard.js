import React, { useEffect, useState } from "react";
import "./profileDashboard.css";
import axiosInstance from "../../axios config/axiosinstance";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileAside from "../profileAside/profileAside";

const ProfileDashboard = () => {
    const userdata = useSelector((state) => state.user.userData)
    const loading = useSelector((state) => state.loader.isLoading);
    const [orders, setOrders] = useState([])
    const [formattedDate, setFormattedDate] = useState("")

    useEffect(() => {
        axiosInstance.get(`orders/${userdata.id}`)
            .then((res) => {
                setOrders(res.data)
                if (res.data.length > 0) {
                    setFormattedDate(new Date(res.data[0].created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    }))
                }
            })
    }, [])

    return (
        <>
            <main className="content orders-main body d-flex flex-column flex-md-row">
                <ProfileAside></ProfileAside>
                <section className="col">
                    <h2>Welcome, {userdata.username}</h2>
                    {loading && <div className="d-flex justify-content-center overlay">
                        <div className="spinner-grow loader" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}

                    <div className="total-orders">You ordered {orders.length} {orders.length > 1 ? "orders" : "order"}.</div>

                    <div>
                        <div className="d-flex justify-content-between align-items-center recent-order">
                            <h4>Your Recent Order:</h4>
                            <Link to="/orders" className="view">View Orders</Link>
                        </div>
                        {orders.length == 0 ?
                            <div className="order-no-text">There is no orders yet.</div> :
                            <Link to={`/tracking/${orders[0].id}`} className="order-link">
                                <div className="order-div d-flex justify-content-between">
                                    <div className="order-subdiv">
                                        <div className="order-header">Order Code:</div>
                                        <div className="order-info">#{orders[0].order_code}</div>
                                    </div>
                                    <div className="order-subdiv">
                                        <div className="order-header">Status:</div>
                                        <div className={orders[0].status == "cancelled" ? "red order-info" : orders[0].status == "completed" ? "green order-info" : orders[0].status == "pending" ? "yellow order-info" : "orange order-info"}>{orders[0].status}</div>
                                    </div>
                                    <div className="order-subdiv">
                                        <div className="order-header">Order Date:</div>
                                        <div className="order-info">{formattedDate}</div>
                                    </div>
                                    <div className="order-subdiv">
                                        <div className="order-header">Total:</div>
                                        <div className="order-info">{orders[0].total_price}</div>
                                    </div>
                                </div>
                            </Link>}
                    </div>
                </section>
            </main>
        </>
    );
};

export default ProfileDashboard;