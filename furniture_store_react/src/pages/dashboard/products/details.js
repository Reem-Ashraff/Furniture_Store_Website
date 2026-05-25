import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import axiosInstance from "../../../axios config/axiosinstance";
import { useSelector, useDispatch } from "react-redux";
import "../products/products.css";
import { cart } from "../../../store/actions/cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { favorites } from "../../../store/actions/favorites";
import CountDown from "../../sales/countDown";
import AsideDashboard from "../aside";
import FooterDashboard from "../footer";
import DashHeader from "../dashHeader";

const Details = () => {
    const params = useParams()
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const dispatch = useDispatch()
    const discountedProducts = useSelector((state) => state.sales.sales)
    const loading = useSelector((state) => state.loader.isLoading)
    const [product, setProduct] = useState(null)
    const userId = useSelector((state) => state.user.userData.id)
    const [data, setData] = useState({
        "user_id": userId,
        "product_id": ""
    })
    const discountedProduct = discountedProducts.find((item) => item.product_id == params.id)

    const addToCart = (id) => {
        const newData = { ...data, product_id: id };
        setData(newData)
        axiosInstance.post("addToCart", newData)
            .then((res) => {
                console.log(res.data)
                axiosInstance.get(`cartItems/${userId}`)
                    .then((response) => {
                        dispatch(cart(response.data))
                    })
            })
    }

    const addFavorite = (id) => {
        const newData = { ...data, product_id: id };
        setData(newData)
        axiosInstance.post("addFavorite", newData)
            .then((res) => {
                axiosInstance.get(`favorites/${userId}`)
                    .then((response) => {
                        dispatch(favorites(response.data))
                    })
            })
    }

    useEffect(() => {
        axiosInstance.get(`details/${params.id}`)
            .then((res) => {
                setProduct(res.data)
            })
    }, [])

    if (product == null) {
        return (
            <div className="d-flex justify-content-center overlay">
                <div className="spinner-grow loader" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    else {
        return (
            <>
                <div className="d-flex">
                    <AsideDashboard></AsideDashboard>
                    <main className="col-9 col-md-10 page-wrapper">
                        <DashHeader></DashHeader>
                        <section className="category-main content">
                            <h3>Product Details</h3>
                            <div className="">
                                {loading && <div className="d-flex justify-content-center overlay">
                                    <div className="spinner-grow loader" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>}
                                <div className="details d-flex flex-column flex-md-row justify-content-center align-items-center">
                                    <div className="col-12 col-md-5 image">
                                        <img src={baseUrl + product[0].image} className="w-75 h-auto product-img" />
                                        {discountedProduct ?
                                            <div className="sale">{discountedProduct.discount_type == "percentage" ? `${parseFloat(discountedProduct.discount_value)}% OFF` : "Hot Deal"}</div> :
                                            ""
                                        }
                                    </div>
                                    <div className="col-12 col-md-5 text">
                                        <h2>{product[0].product_name}</h2>
                                        <div className="stock">Stock: <span className={`${product[0].stock > 0 ? "green" : "red"}`}>{product[0].stock > 0 ? "In Stock" : "Sold Out"}</span></div>
                                        {discountedProduct ?
                                            <div>
                                                <div className="d-flex align-items-center">
                                                    <h5 className="old-price">${product[0].price}</h5>
                                                    <h5 className="new-price">${discountedProduct.discount_type == "percentage" ? (product[0].price * (100 - discountedProduct.discount_value)) / 100 : product[0].price - discountedProduct.discount_value}</h5>
                                                </div>
                                                <CountDown endDate={discountedProduct.end_date} />
                                            </div> :
                                            <p className="price">${product[0].price}</p>}
                                        <p className="description">{product[0].description}</p>
                                        <div className="category">Category: <span>{product[0].category_name}</span></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <FooterDashboard></FooterDashboard>
                    </main>
                </div >
            </>
        )
    }
}

export default Details;