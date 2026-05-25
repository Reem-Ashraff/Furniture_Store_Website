import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
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

const UserAdd = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.loader.isLoading)
    const userData = useSelector((state) => state.user.userData)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        role: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const validation = () => {
        let newErrors = {}
        if (formData.username == "") {
            newErrors.username = "Username is required"
        }
        else if (formData.username.length < 5) {
            newErrors.username = "Username is too short"
        }

        if (formData.email == "") {
            newErrors.email = "Email is required"
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (formData.phone == "") {
            newErrors.phone = "Phone is required"
        }
        else if (!/^[0-9]{11}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 11 digits"
        }

        if (formData.address == "") {
            newErrors.address = "Address is required"
        }

        if (formData.role == "") {
            newErrors.role = "Role is required"
        }

        if (formData.password == "") {
            newErrors.password = "Password is required"
        }
        else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (formData.confirmPassword == "") {
            newErrors.confirmPassword = "Confirm Password is required"
        }
        else if (formData.confirmPassword != formData.password) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        console.log(isValid)
        if (isValid) {
            axiosInstance.post("add", formData)
                .then((res) => {
                    setMessage(res.data.message)
                })
        }
        else {
            e.preventDefault();
            console.log("invalid")
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
                            <h3>Add User</h3>
                            <div className="add-product d-flex justify-content-center align-items-center">
                                <form action="post" className="form" onSubmit={handleSubmit}>
                                    <div className="text-center message">{message}</div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Username:</label>
                                        <input type="text" id="categoryName" name="username" value={formData.username} onChange={(e) => handleChange(e)} />
                                        <div className="error">{errors.username}</div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Email:</label>
                                        <input type="text" id="categoryName" name="email" value={formData.email} onChange={(e) => handleChange(e)} />
                                        <div className="error">{errors.email}</div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Phone:</label>
                                        <input type="text" id="categoryName" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} />
                                        <div className="error">{errors.phone}</div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Address:</label>
                                        <input type="text" id="categoryName" name="address" value={formData.address} onChange={(e) => handleChange(e)} />
                                        <div className="error">{errors.address}</div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Role:</label>
                                        <div className="d-flex">
                                            <div className="ratio-item">
                                                <input type="radio" id="admin" name="role" value="admin" checked={formData.role === "admin"} onChange={handleChange} />
                                                <label htmlFor="admin" className="ms-1">Admin</label>
                                            </div>
                                            <div className="ratio-item">
                                                <input type="radio" id="user" name="role" value="user" checked={formData.role === "user"} onChange={handleChange} />
                                                <label htmlFor="admin" className="ms-1">User</label>
                                            </div>
                                            <div className="ratio-item">
                                                <input type="radio" id="driver" name="role" value="driver" checked={formData.role === "driver"} onChange={handleChange} />
                                                <label htmlFor="admin" className="ms-1">Driver</label>
                                            </div>
                                        </div>
                                        <div className="error">{errors.role}</div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Password:</label>
                                        <input type="password" id="categoryName" name="password" value={formData.password} onChange={(e) => handleChange(e)} />
                                        <div className="error">{errors.password}</div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Confirm Password:</label>
                                        <input type="password" id="categoryName" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChange(e)} />
                                        <div className="error">{errors.confirmPassword}</div>
                                    </div>
                                    <input type="submit" className="dash-submit w-100" value="Add" />
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

export default UserAdd;