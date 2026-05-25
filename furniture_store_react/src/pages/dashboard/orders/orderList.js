import React, { useState } from "react";
import "./orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faXmark, faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../../axios config/axiosinstance";
import AsideDashboard from "../aside";
import FooterDashboard from "../footer";
import Table from "../../../assets/Seito-Wood-Table.jpg";
import DashHeader from "../dashHeader";

const OrderList = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const uniqueOrders = [...new Map(orders.map(item => [item.order_id, item])).values()];
    const [msg, setMsg] = useState("")
    const [isShow, setIsShow] = useState(false)
    const [id, setId] = useState("")
    const [query, setQuery] = useState("");

    useEffect(() => {
        axiosInstance.get("allOrders")
            .then((response) => {
                setOrders(response.data)
            })
    }, [])

    // const deleteProduct = () => {
    //     axiosInstance.get(`productDelete/${id}`)
    //         .then((res) => {
    //             if (res.message != "Product deleted successfully") {
    //                 setMsg(res.message)
    //             }
    //             axiosInstance.get("products")
    //                 .then((res) => {
    //                     setProducts(res.data)
    //                 })
    //         })
    //     setIsShow(false)
    // }

    // const handleIsShow = (productId) => {
    //     setIsShow(true)
    //     setId(productId)
    // }

    // const closeProductShow = () => {
    //     setIsShow(false)
    // }

    // const handleSearch = () => {
    //     if (query != "") {
    //         axiosInstance.get(`search/${query}`)
    //             .then((res) => {
    //                 setProducts(res.data)
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             })
    //     }
    // }

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
                            <div className="d-flex justify-content-between align-items-center dash-head">
                                <h3>Orders <span>( {uniqueOrders.length} {uniqueOrders.length > 1 ? "orders" : "order"} )</span></h3>
                                <div>
                                    {/* <div className="input-group search">
                                        <input type="search" className="form-control" placeholder="Search" onChange={(event) => setQuery(event.target.value)} />
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </div> */}
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <table className="order-table">
                                    <thead>
                                        <tr>
                                            <th className="col-3 order-code">Order Code</th>
                                            <th className="col-2">Date</th>
                                            <th className="col-3">Customer</th>
                                            <th className="col-1">Items</th>
                                            <th className="col-1">Total</th>
                                            <th className="col-2">Status</th>
                                            {/* <th className="col-1">Actions</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {uniqueOrders.map((order) => {
                                            const formattedDate = new Date(order.date).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric"
                                            });
                                            const items = orders.filter((item) => order.order_id == item.order_id)
                                            return (
                                                <tr key={order.order_id}>
                                                    <td className="order-code code-td">
                                                        <Link to={`order/details/${order.order_id}`} className="code-td">#{order.order_code}</Link>
                                                    </td>
                                                    <td className="">{formattedDate}</td>
                                                    <td className="">{order.username}</td>
                                                    <td className="">{items.length}</td>
                                                    <td className="">{order.total_price}</td>
                                                    <td className={order.status=="cancelled"?"red":order.status=="completed"?"green":order.status=="pending"?"yellow":"orange"}>{order.status}</td>
                                                    {/* <td className="text-center">
                                                        <Link to={`orders/edit/${order.order_id}`}><FontAwesomeIcon icon={faPencil} className="edit"></FontAwesomeIcon></Link>
                                                    </td> */}
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
            {/* {isShow && <div className="d-flex justify-content-center align-items-center dash-overlay"><div className="certain">
                <p>Are you sure you want to delete this product?</p>
                <div className="d-flex justify-content-center">
                    <button onClick={() => { closeProductShow() }} className="no">No</button>
                    <button onClick={() => { deleteProduct() }}>Yes</button>
                </div>
            </div></div>} */}
        </>
    )
}

export default OrderList;