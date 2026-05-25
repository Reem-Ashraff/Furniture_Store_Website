import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./categories.css";
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

const CategoryAdd = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [category, setCategory] = useState([])
    const params = useParams()
    const [formData, setFormData] = useState({
        id: "",
        category_name: "",
        parent_id: ""
    })
    const [message, setMessage] = useState("")
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axiosInstance.get("categories")
            .then((res) => {
                setCategories(res.data)
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
        axiosInstance.post("addCategory", formData)
            .then((res) => {
                setMessage(res.data.message)
                axiosInstance.get("categories")
                    .then((res) => {
                        setCategories(res.data)
                    })
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
                            <h3>Add Category</h3>
                            <div className="add-product d-flex justify-content-center align-items-center">
                                <form action="post" className="form" onSubmit={handleSubmit}>
                                    <div className="text-center message">{message}</div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="categoryName">Category Name:</label>
                                        <input type="text" id="categoryName" name="category_name" value={formData.category_name} onChange={(e) => handleChange(e)} />
                                        <div className="error"></div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="parentId">Parent Category:</label>
                                        <select className="form-select input w-100" name="parent_id" onChange={(e) => handleChange(e)}>
                                            <option value="">categories</option>
                                            {categories.map((category) => {
                                                return (
                                                    <option key={category.id} value={category.id}>{category.category_name}</option>
                                                )
                                            })}
                                        </select>
                                        {/* <input type="text" id="parentId" name="parent_id" value={formData.parent_id} onChange={(e) => handleChange(e)} /> */}
                                        <div className="error"></div>
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

export default CategoryAdd;