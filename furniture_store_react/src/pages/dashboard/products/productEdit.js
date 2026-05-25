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

const ProductEdit = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [product, setProduct] = useState([])
    const params = useParams()
    const [formData, setFormData] = useState({
        id: "",
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
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    // const parent_category = categories.find((item)=>item.id == category.parent_id)

    useEffect(() => {
        axiosInstance.get("categories")
            .then((res) => {
                setCategories(res.data)
            })
        axiosInstance.get(`details/${params.id}`)
            .then((res) => {
                setProduct(res.data)
                setFormData({
                    ...formData,
                    ["id"]: res.data[0].id,
                    ["product_name"]: res.data[0].product_name,
                    ["price"]: res.data[0].price,
                    ["description"]: res.data[0].description,
                    ["stock"]: res.data[0].stock,
                    ["category_id"]: res.data[0].category_id,
                    ["image"]: res.data[0].image,
                })
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
        data.append("id", formData.id);
        data.append("product_name", formData.product_name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category_id", formData.category_id);
        data.append("stock", formData.stock);
        if (formData.image) data.append("image", formData.image);

        axiosInstance.post("updateProduct", data, { headers: { "Content-Type": "multipart/form-data" } })
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
                        {loading && <div className="d-flex justify-content-center content overlay">
                            <div className="spinner-grow loader" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                        <section>
                            <h3>Edit Product</h3>
                            <div className="add-product d-flex justify-content-center align-items-center">
                                <form action="post" enctype="multipart/form-data" className="add-form flex-column flex-md-row d-flex align-items-center" onSubmit={handleSubmit}>
                                    <div className="col-12 col-md-5 dash-img-div">
                                        <div className="">
                                            <label htmlFor="image" className="upload-area">
                                                {preview ? (
                                                    <img src={preview} alt="preview" className="preview-img w-100" />
                                                ) :
                                                    <>
                                                        <img src={baseUrl + formData.image} alt="preview" className="preview-img w-100" />
                                                        <div className="image-content d-flex flex-column justify-content-center">
                                                            <i className="cloud-icon"><FontAwesomeIcon icon={faCloudArrowUp} className="drop-icon"></FontAwesomeIcon></i>
                                                            <p>
                                                                Drop your image here or <span>click to browse</span>
                                                            </p>
                                                        </div>
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
                                                        <option key={category.id} value={category.id} selected={category.id == formData.category_id}>{category.category_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <div className="error"></div>
                                        </div>
                                        <div className="d-flex flex-column inputs">
                                            <label htmlFor="stock">Stock:</label>
                                            <input type="text" id="stock" name="stock" value={formData.stock} onChange={(e) => handleChange(e)} />
                                            <div className="error"></div>
                                        </div>
                                        {/* <div className="d-flex flex-column inputs">
                                    <label htmlFor="image0">Image:</label>
                                    <input type="file" id="image0" name="image" className="form-control" onChange={(e) => handleChange(e)} />
                                    <div className="error"></div>
                                </div> */}
                                        <input type="submit" className="dash-submit w-100" value="Edit" />
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

export default ProductEdit;