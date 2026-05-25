import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./offers.css";
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

const OfferDelete = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        id: ""
    })
    const [message, setMessage] = useState("")
    const [sales, setSales] = useState([])

    useEffect(() => {
        axiosInstance.get("sales")
            .then((res) => {
                setSales(res.data)
            })
    }, [])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.delete(`saleDelete/${formData.id}`)
            .then((res) => {
                setMessage(res.data.message)
            })
            axiosInstance.get("sales")
            .then((res) => {
                setSales(res.data)
            })
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
                            <h3 className="">Delete Offer</h3>
                            <div className="d-flex justify-content-center align-items-center margin-top">
                                <form action="post" className="form" onSubmit={handleSubmit}>
                                    <div className="text-center message">{message}</div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="parentId">Sale:</label>
                                        <select className="form-select input w-100" name="id" onChange={(e) => handleChange(e)}>
                                            <option value="">Choose Sale..</option>
                                            {sales.map((sale) => {
                                                return (
                                                    <option key={sale.id} value={sale.id}>{sale.title}</option>
                                                )
                                            })}
                                        </select>
                                        <div className="error"></div>
                                    </div>
                                    <input type="submit" className="dash-submit w-100" value="Delete" />
                                </form>
                            </div>
                        </section>
                    </main>
                    <FooterDashboard></FooterDashboard>
                </div>
            </div >
        </>
    )
}

export default OfferDelete;