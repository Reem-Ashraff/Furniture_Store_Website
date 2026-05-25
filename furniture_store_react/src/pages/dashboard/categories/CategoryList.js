import React, { useState } from "react";
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

const CategoryList = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false)
    const [id, setId] = useState("")
    const [query, setQuery] = useState("");

    useEffect(() => {
        axiosInstance.get("categories")
            .then((res) => {
                setCategories(res.data)
            })
        axiosInstance.get("products")
            .then((response) => {
                setProducts(response.data)
            })
    }, [])

    const deleteCategory = () => {
        axiosInstance.get(`category/${id}`)
            .then((res) => {
                if (res.message != "Category deleted successfully") {
                    setMsg(res.message)
                }
                axiosInstance.get("categories")
                    .then((res) => {
                        setCategories(res.data)
                    })
            })
        setShow(false)
    }

    const handleShow = (catId) => {
        setShow(true)
        setId(catId)
    }

    const closeShow = () => {
        setShow(false)
    }

    const handleSearch = () => {
        if (query != "") {
            axiosInstance.get(`searchCategories/${query}`)
                .then((res) => {
                    console.log(res.data)
                    setCategories(res.data)
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
                                <h3>Categories <span>( {categories.length} {categories.length > 1 ? "categories" : "category"} )</span></h3>
                                <div>
                                    <div className="mt-2 mt-md-0 input-group search">
                                        <input type="search" className="form-control" placeholder="Search" onChange={(event) => setQuery(event.target.value)} />
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div>{msg}</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className=""></th>
                                            <th className="col-3">Category</th>
                                            <th className="col-3">Parent Category</th>
                                            <th className="col-3">Number of Products</th>
                                            <th className="col-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => {
                                            const parentCategory = categories.find((item) => item.id == category.parent_id) || ""
                                            let categoryProducts = []
                                            if (!category.parent_id) {
                                                const subCategoryies = categories.filter((item) => item.parent_id == category.id)
                                                categoryProducts = []
                                                subCategoryies.forEach((subCategory) => {
                                                    const subProducts = products.filter((item) => item.category_id === subCategory.id);
                                                    categoryProducts = categoryProducts.concat(subProducts);
                                                })
                                            }
                                            else {
                                                categoryProducts = products.filter((item) => item.category_id == category.id)
                                            }
                                            return (
                                                <tr key={category.id}>
                                                    <td className="text-center"><FontAwesomeIcon icon={faXmark} className="delete rounded-circle" onClick={() => { handleShow(category.id) }}></FontAwesomeIcon></td>
                                                    <td className="">{category.category_name}</td>
                                                    <td className="">{parentCategory.category_name || "-"}</td>
                                                    <td className="">{categoryProducts.length || 0}</td>
                                                    <td className="text-center">
                                                        <Link to={`categories/edit/${category.id}`}><FontAwesomeIcon icon={faPencil} className="edit"></FontAwesomeIcon></Link>
                                                    </td>
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
            {show && <div className="d-flex justify-content-center align-items-center dash-overlay"><div className="certain">
                <p>Are you sure you want to delete this category?</p>
                <div className="d-flex justify-content-center">
                    <button onClick={() => { closeShow() }} className="no">No</button>
                    <button onClick={() => { deleteCategory() }}>Yes</button>
                </div>
            </div></div>}
        </>
    )
}

export default CategoryList;