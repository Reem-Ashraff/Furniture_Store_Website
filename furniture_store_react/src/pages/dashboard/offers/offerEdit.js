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

const OfferEdit = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const params = useParams()
    const [products, setProducts] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        discount_type: "",
        discount_value: "",
        start_date: "",
        end_date: "",
        products: []
    })
    const [message, setMessage] = useState("")

    useEffect(() => {
        axiosInstance.get("products")
            .then((res) => {
                setProducts(res.data)
            })
        axiosInstance.get(`sale/${params.id}`)
            .then((res) => {
                const offer = res.data
                setFormData({
                    title: offer.sale.title,
                    discount_type: offer.sale.discount_type,
                    discount_value: offer.sale.discount_value,
                    start_date: offer.sale.start_date,
                    end_date: offer.sale.end_date,
                    products: offer.products.map(p => p.id.toString())
                })
                console.log(formData)
            })
    }, [])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleProductsChange = (e) => {
        const value = e.target.value;

        if (e.target.checked) {
            setFormData({
                ...formData,
                products: [...formData.products, value]
            });
        } else {
            setFormData({
                ...formData,
                products: formData.products.filter(id => id !== value)
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post(`updateSale/${params.id}`, formData)
            .then((res) => {
                setMessage(res.data.message)
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
                            <h3>Edit Offer</h3>
                            <div className="add-product d-flex justify-content-center align-items-center">
                                <form action="post" className="form" onSubmit={handleSubmit}>
                                    <div className="text-center message">{message}</div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="offerTitle">Offer Title:</label>
                                        <input type="text" id="offerTitle" name="title" value={formData.title} onChange={(e) => handleChange(e)} />
                                        <div className="error"></div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="discountType">Discount Type:</label>
                                        <div className="d-flex" id="discountType">
                                            <div className="ratio-item">
                                                <input type="radio" className="no-border" id="percentage" name="discount_type" value="percentage" checked={formData.discount_type === "percentage"} onChange={handleChange} />
                                                <label htmlFor="admin" className="ms-1">Percentage</label>
                                            </div>
                                            <div className="ratio-item">
                                                <input type="radio" className="no-border" id="fixed" name="discount_type" value="fixed" checked={formData.discount_type === "fixed"} onChange={handleChange} />
                                                <label htmlFor="admin" className="ms-1">Fixed</label>
                                            </div>
                                        </div>
                                        <div className="error"></div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="discountValue">Discount Value:</label>
                                        <input type="number" id="discountValue" name="discount_value" value={formData.discount_value} onChange={(e) => handleChange(e)} />
                                        <div className="error"></div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="startDate">Start Date:</label>
                                        <input type="date" id="startDate" name="start_date" value={formData.start_date} onChange={(e) => handleChange(e)} />
                                        <div className="error"></div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="endDate">End Date:</label>
                                        <input type="date" id="endDate" name="end_date" value={formData.end_date} onChange={(e) => handleChange(e)} />
                                        <div className="error"></div>
                                    </div>
                                    <div className="d-flex flex-column inputs">
                                        <label htmlFor="products">Offer Products:</label>
                                        <div className="d-flex flex-wrap" id="products">
                                            {products.map((product) => {
                                                return (
                                                    <div className="ratio-item col-12 col-md-5" key={product.id}>
                                                        <input type="checkbox" className="no-border" id={product.product_name} value={product.id} checked={formData.products.includes(product.id.toString())} onChange={(e) => handleProductsChange(e)} />
                                                        <label htmlFor={product.product_name} className="ms-1">{product.product_name}</label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="error"></div>
                                    </div>
                                    <input type="submit" className="dash-submit w-100" value="Edit" />
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

export default OfferEdit;