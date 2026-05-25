import React, { useEffect, useState } from "react";
import "./orders.css";
import axiosInstance from "../../axios config/axiosinstance";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileAside from "../profileAside/profileAside";

const Orders = () => {
    const userId = useSelector((state) => state.user.userData.id)
    const loading = useSelector((state) => state.loader.isLoading);
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axiosInstance.get(`orders/${userId}`)
            .then((res) => {
                setOrders(res.data)
            })
    }, [])

    return (
        <>
            <main className="content orders-main body d-flex flex-column flex-md-row">
                <ProfileAside></ProfileAside>
                <section className="col">
                    <h2>Orders</h2>
                    {loading && <div className="d-flex justify-content-center overlay">
                        <div className="spinner-grow loader" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    <div className="d-flex justify-content-center">
                        {orders.length == 0 ? <div className="no-text">There is no orders yet.</div> :
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th className="col-4 order-code">Order Code</th>
                                        <th className="col-3">Date</th>
                                        <th className="col-2">Total</th>
                                        <th className="col-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        });
                                        return (
                                            <tr key={order.id}>
                                                <td className="order-code code-td">
                                                    <Link to={`/tracking/${order.id}`} className="code-td">#{order.order_code}</Link>
                                                </td>
                                                <td className="">{formattedDate}</td>
                                                <td className="">{order.total_price}</td>
                                                <td className={order.status=="cancelled"?"red":order.status=="completed"?"green":order.status=="pending"?"yellow":"orange"}>{order.status}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Orders;