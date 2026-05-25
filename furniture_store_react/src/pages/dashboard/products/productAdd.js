import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faXmark, faPencil, faSearch, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../../axios config/axiosinstance";
import AsideDashboard from "../aside";
import FooterDashboard from "../footer";
import DashHeader from "../dashHeader";

const ProductAdd = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        product_name: "",
        price: "",
        description: "",
        category_id: "",
        stock: "",
        image: ""
    })
    const [message, setMessage] = useState("")
    const [categories, setCategories] = useState([])
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        axiosInstance.get("categories")
            .then((res) => {
                setCategories(res.data)
            })
    }, [])

    const handleChange = (event) => {
        if (event.target.name == "image") {
            setFormData({
                ...formData,
                image: event.target.files[0]
            })
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
        else {
            setFormData({
                ...formData,
                [event.target.name]: event.target.value
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("product_name", formData.product_name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category_id", formData.category_id);
        data.append("stock", formData.stock);
        if (formData.image) data.append("image", formData.image);

        axiosInstance.post("addProduct", data, { headers: { "Content-Type": "multipart/form-data" } })
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
                            <h3>Add Product</h3>
                            <div className="add-product d-flex justify-content-center align-items-center">
                                <form action="post" enctype="multipart/form-data" className="add-form flex-column flex-md-row d-flex align-items-center" onSubmit={handleSubmit}>
                                    <div className=" col-12 col-md-5 dash-img-div">
                                        <div className="">
                                            <label htmlFor="image" className="upload-area">
                                                {preview ? (
                                                    <img src={preview} alt="preview" className="preview-img" />
                                                ) :
                                                    <>
                                                        <i className="cloud-icon"><FontAwesomeIcon icon={faCloudArrowUp} className="drop-icon"></FontAwesomeIcon></i>
                                                        <p>
                                                            Drop your image here or <span>click to browse</span>
                                                        </p>
                                                    </>
                                                }
                                            </label>
                                            <input type="file" id="image" name="image" className="form-control" onChange={(e) => handleChange(e)} />
                                            <div className="error"></div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <div className="text-center message">{message}</div>
                                        <div className="d-flex flex-column inputs">
                                            <label htmlFor="productName">Product Name:</label>
                                            <input type="text" id="productName" name="product_name" value={formData.product_name} onChange={(e) => handleChange(e)} />
                                            <div className="error"></div>
                                        </div>
                                        <div className="d-flex flex-column inputs">
                                            <label htmlFor="price">Price:</label>
                                            <input type="text" id="price" name="price" value={formData.price} onChange={(e) => handleChange(e)} />
                                            <div className="error"></div>
                                        </div>
                                        <div className="d-flex flex-column inputs">
                                            <label htmlFor="description">Description:</label>
                                            <input type="text" id="description" name="description" value={formData.description} onChange={(e) => handleChange(e)} />
                                            <div className="error"></div>
                                        </div>
                                        <div className="d-flex flex-column inputs">
                                            <label htmlFor="category">Category:</label>
                                            <select className="form-select input w-100" id="category" name="category_id" onChange={(e) => handleChange(e)}>
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
                                        <div className="d-flex flex-column inputs">
                                            <label htmlFor="stock">Stock:</label>
                                            <input type="text" id="stock" name="stock" value={formData.stock} onChange={(e) => handleChange(e)} />
                                            <div className="error"></div>
                                        </div>
                                        {/* <div className="d-flex flex-column inputs">
                                        <label htmlFor="image">Image:</label>
                                        <input type="file" id="image" name="image" className="form-control" onChange={(e) => handleChange(e)} />
                                        <div className="error"></div>
                                    </div> */}
                                        <input type="submit" className="dash-submit w-100" value="Add" />
                                    </div>
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

export default ProductAdd;