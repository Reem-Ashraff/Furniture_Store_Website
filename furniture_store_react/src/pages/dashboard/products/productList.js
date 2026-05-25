import React, { useState } from "react";
import "./products.css";
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

const ProductList = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [msg, setMsg] = useState("")
    const [isShow, setIsShow] = useState(false)
    const [id, setId] = useState("")
    const [query, setQuery] = useState("");

    useEffect(() => {
        axiosInstance.get("products")
            .then((response) => {
                setProducts(response.data)
            })
    }, [])

    const deleteProduct = () => {
        axiosInstance.get(`productDelete/${id}`)
            .then((res) => {
                if (res.message != "Product deleted successfully") {
                    setMsg(res.message)
                }
                axiosInstance.get("products")
                    .then((res) => {
                        setProducts(res.data)
                    })
            })
        setIsShow(false)
    }

    const handleIsShow = (productId) => {
        setIsShow(true)
        setId(productId)
    }

    const closeProductShow = () => {
        setIsShow(false)
    }

    const handleSearch = () => {
        if (query != "") {
            axiosInstance.get(`search/${query}`)
                .then((res) => {
                    setProducts(res.data)
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
                                <h3>Products <span>( {products.length} {products.length > 1 ? "products" : "product"} )</span></h3>
                                <div>
                                    <div className=" mt-2 mt-md-0 input-group search">
                                        <input type="search" className="form-control" placeholder="Search" onChange={(event) => setQuery(event.target.value)} />
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center container-fluid">
                                <div>{msg}</div>
                                <div className="row">
                                <table className="product-table">
                                    <thead>
                                        <tr>
                                            <th className=""></th>
                                            <th className="col-4">Product</th>
                                            <th className="col-1">Price</th>
                                            <th className="col-1">Sale</th>
                                            <th className="col-2">Stock</th>
                                            <th className="col-1">Quantity</th>
                                            <th className="col-2">Category</th>
                                            <th className="col-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => {
                                            return (
                                                <tr key={product.id}>
                                                    <td className="text-center del"><FontAwesomeIcon icon={faXmark} className="delete rounded-circle" onClick={() => { handleIsShow(product.id) }}></FontAwesomeIcon></td>
                                                    <td className="d-flex align-items-center">
                                                        <Link to={`product/details/${product.id}`} className="link">
                                                            <div className="d-flex align-items-center w-100 product">
                                                                <img src={baseUrl+product.image} className="h-auto" />
                                                                <div className="">{product.product_name}</div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="">${product.price}</td>
                                                    <td className="">${product.price}</td>
                                                    <td className={(product.stock == 0) ? "red" : "green"}>{(product.stock == 0) ? "Sold out" : "In Stock"}</td>
                                                    <td className="">{product.stock}</td>
                                                    <td className="">{product.category_name}</td>
                                                    <td className="text-center">
                                                        <Link to={`products/edit/${product.id}`}><FontAwesomeIcon icon={faPencil} className="edit"></FontAwesomeIcon></Link>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </section>
                    </main>
                    <FooterDashboard></FooterDashboard>
                </div>
            </div >
            {isShow && <div className="d-flex justify-content-center align-items-center dash-overlay"><div className="certain">
                <p>Are you sure you want to delete this product?</p>
                <div className="d-flex justify-content-center">
                    <button onClick={() => { closeProductShow() }} className="no">No</button>
                    <button onClick={() => { deleteProduct() }}>Yes</button>
                </div>
            </div></div>}
        </>
    )
}

export default ProductList;