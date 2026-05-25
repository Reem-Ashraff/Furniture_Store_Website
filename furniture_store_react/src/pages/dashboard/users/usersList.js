import React, { useState } from "react";
import "./users.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faXmark, faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../../axios config/axiosinstance";
import AsideDashboard from "../aside";
import FooterDashboard from "../footer";
import DashHeader from "../dashHeader";

const UsersList = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [users, setUsers] = useState([])
    // const uniqueOrders = [...new Map(orders.map(item => [item.order_id, item])).values()];
    const [msg, setMsg] = useState("")
    const [isShow, setIsShow] = useState(false)
    const [id, setId] = useState("")
    const [query, setQuery] = useState("");

    useEffect(() => {
        axiosInstance.get("users")
            .then((response) => {
                setUsers(response.data)
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

    const handleSearch = () => {
        if (query != "") {
            axiosInstance.get(`searchUser/${query}`)
                .then((res) => {
                    setUsers(res.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

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
                            <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center dash-head">
                                <h3>Users <span>( {users.length} {users.length > 1 ? "users" : "user"} )</span></h3>
                                <div className="mt-2 mt-md-0 user-search">
                                    <div className="input-group search">
                                        <input type="search" className="form-control" placeholder="Search by username, email, address & role" onChange={(event) => setQuery(event.target.value)} />
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-center">
                                <table className="order-table users">
                                    <thead>
                                        <tr>
                                            <th className="col-3 order-code">User</th>
                                            <th className="col-3">Email</th>
                                            <th className="col-2">Phone</th>
                                            <th className="col-2">Address</th>
                                            <th className="col-1">Role</th>
                                            <th className="col-1">Join On</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => {
                                            const formattedDate = new Date(user.created_at).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric"
                                            });
                                            // const items = orders.filter((item) => order.order_id == item.order_id)
                                            return (
                                                <tr key={user.id}>
                                                    <td className="order-code code-td">{user.username}</td>
                                                    <td className="">{user.email}</td>
                                                    <td className="">{user.phone}</td>
                                                    <td className="">{user.address}</td>
                                                    <td className="">{user.role}</td>
                                                    <td className="">{formattedDate}</td>
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

export default UsersList;