import React, { useEffect, useState } from "react";
import "./sales.css";
import axiosInstance from "../../axios config/axiosinstance";
import Table from "../../assets/Seito-Wood-Table.jpg";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import { useSelector, useDispatch } from "react-redux";
import CountDown from "./countDown";
import background from "../../assets/background3.jpg"
import { sales } from "../../store/actions/sales";

const Sales = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const dispatch = useDispatch()
    const [salesTitles, setSalesTitles] = useState([])
    const userId = useSelector((state) => state.user.userData.id)
    const loading = useSelector((state) => state.loader.isLoading)
    const discountedProducts = useSelector((state) => state.sales.sales)
    const [data, setData] = useState({
        "user_id": userId,
        "product_id": ""
    })
    const [salesProducts, setSalesProducts] = useState([])

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

    useEffect(() => {
        axiosInstance.get("activeSalesProducts")
            .then((res) => {
                dispatch(sales(res.data))
                setSalesProducts(res.data)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get("activeSales")
            .then((res) => {
                setSalesTitles(res.data)
            })
    }, [])
    return (
        <>
            <main className="products-main body content d-flex flex-column justify-content-center">
                {loading && <div className="d-flex justify-content-center overlay">
                            <div className="spinner-grow loader" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>}
                {salesTitles.length == 0
                    ? <div className="no-text text-center">No Sales yet.</div> :
                    <>
                        <section className="sales-section">
                            <div id="carouselExampleAutoplaying" className="carousel slide banner" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {salesTitles.map((sale) => {
                                        return (
                                            <div className="carousel-item active" key={sale.id}>
                                                <img src={background} className="d-block w-100" alt="..." />
                                                <div className="sales-title" key={sale.id}>
                                                    <h5>{sale.title} {sale.discount_type == "percentage" ? `${parseFloat(sale.discount_value)}% OFF` : `$${parseFloat(sale.discount_value)} discount`}</h5>
                                                    <CountDown endDate={sale.end_date} />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </section>

                        <section className="title">
                            <h2 className="text-center">Featured Sales</h2>
                        </section>

                        <section>
                            <div className="d-flex flex-wrap justify-content-center home-section2-carts">
                                {salesProducts.map((product) => {
                                    // const discountedProduct = salesProducts.find((item) => item.product_id == product.id)
                                    return (
                                        <div className="col-5 col-sm-5 col-lg-3 col-xxl-2 best-seller-cart" key={product.id}>
                                            <div className="image">
                                                <Link to={`/details/${product.id}`}>
                                                    <img src={baseUrl + product.image} className="w-100 h-100"></img>
                                                </Link>
                                                {/* <FontAwesomeIcon icon={faHeart} className="favorite" onClick={() => { addFavorite(product.id) }}></FontAwesomeIcon> */}
                                                <div className="sale">{product.discount_type == "percentage" ? `${parseFloat(product.discount_value)}% OFF` : `$${parseFloat(product.discount_value)} discount`}</div>
                                            </div>
                                            <div className="description">
                                                <h4>{product.product_name}</h4>
                                                <p>{product.category_name}</p>
                                                <div className="d-flex">
                                                    <h5 className="old-price">${product.price}</h5>
                                                    <h5 className="new-price">${product.discount_type == "percentage" ? (product.price * (100 - product.discount_value)) / 100 : product.price - product.discount_value}</h5>
                                                </div>
                                                <CountDown className="timer" endDate={product.end_date} />
                                                <FontAwesomeIcon icon={faHeart} className="favorite" onClick={() => { addFavorite(product.id) }}></FontAwesomeIcon>
                                            </div>
                                            <button className="w-100" disabled={product.stock === 0} onClick={() => { addToCart(product.id) }}>{product.stock === 0 ? "Sold Out" : "Add To Cart"}</button>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    </>
                }
            </main>
        </>
    )
}

export default Sales;