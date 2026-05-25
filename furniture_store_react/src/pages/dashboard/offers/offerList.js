import React, { useState } from "react";
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

const OffersList = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [sales, setSales] = useState([])
    const [saleProducts, setSaleProducts] = useState([])
    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false)
    const [id, setId] = useState("")
    const [query, setQuery] = useState("");

    useEffect(() => {
        axiosInstance.get("sales")
            .then((res) => {
                setSales(res.data)
            })
        axiosInstance.get("saleProducts")
            .then((response) => {
                setSaleProducts(response.data)
            })
    }, [])

    const deleteCategory = () => {
        axiosInstance.delete(`saleDelete/${id}`)
            .then((res) => {
                if (res.message != "Sale deleted successfully") {
                    setMsg(res.message)
                }
                axiosInstance.get("sales")
                    .then((res) => {
                        setSales(res.data)
                    })
                axiosInstance.get("saleProducts")
                    .then((response) => {
                        setSaleProducts(response.data)
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
        // if (query != "") {
        //     axiosInstance.get(`searchCategories/${query}`)
        //         .then((res) => {
        //             console.log(res.data)
        //             setCategories(res.data)
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         })
        // }
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
                            <div className="d-flex justify-content-between align-items-center dash-head">
                                <h3>Offers <span>( {sales.length} {sales.length > 1 ? "offers" : "offer"} )</span></h3>
                                {/* <div>
                                    <div className="input-group search">
                                        <input type="search" className="form-control" placeholder="Search" onChange={(event) => setQuery(event.target.value)} />
                                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div> */}
                            </div>
                            <div className="d-flex justify-content-center">
                                <div>{msg}</div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className=""></th>
                                            <th className="col-3">Title</th>
                                            <th className="col-2">Discount</th>
                                            <th className="col-3">Duration</th>
                                            <th className="col-2">Products Count</th>
                                            <th className="col-1">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((sale) => {
                                            const startDate = new Date(sale.start_date).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric"
                                            });
                                            const endDate = new Date(sale.end_date).toLocaleDateString("en-US", {
                                                day: "numeric",
                                                month: "numeric",
                                                year: "numeric"
                                            });
                                            const products = saleProducts.filter((item) => sale.id == item.sale_id)
                                            return (
                                                <tr key={sale.id}>
                                                    <td className="text-center"><FontAwesomeIcon icon={faXmark} className="delete rounded-circle" onClick={() => { handleShow(sale.id) }}></FontAwesomeIcon></td>
                                                    <td className="">{sale.title}</td>
                                                    <td className="">{sale.discount_type == "percentage" ? `${parseFloat(sale.discount_value)}%` : `$${parseFloat(sale.discount_value)}`}</td>
                                                    <td className="">{startDate} -&gt;{endDate}</td>
                                                    <td className="">{products.length}</td>
                                                    <td className="text-center">
                                                        <Link to={`offer/edit/${sale.id}`}><FontAwesomeIcon icon={faPencil} className="edit"></FontAwesomeIcon></Link>
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
                <p>Are you sure you want to delete this offer?</p>
                <div className="d-flex justify-content-center">
                    <button onClick={() => { closeShow() }} className="no">No</button>
                    <button onClick={() => { deleteCategory() }}>Yes</button>
                </div>
            </div></div>}
        </>
    )
}

export default OffersList;