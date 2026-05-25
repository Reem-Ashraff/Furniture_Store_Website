import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "./home.css";
import { Typed } from "react-typed";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../assets/Seito-Wood-Table.jpg"
import axiosInstance from "../../axios config/axiosinstance";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { faTruck, faClock, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import { sales } from "../../store/actions/sales";

const Home = () => {
    const dispatch = useDispatch()
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const discountedProducts = useSelector((state) => state.sales.sales)
    const loading = useSelector((state) => state.loader.isLoading)
    const userId = useSelector((state) => state.user.userData.id)
    const [bestSellers, setBestSellers] = useState([])
    const [newArrivals, setNewArrivals] = useState([])
    const [categories, setCategories] = useState([])
    const [data, setData] = useState({
        "user_id": userId,
        "product_id": ""
    })

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
        axiosInstance.get("newArrivals")
            .then((res) => {
                setNewArrivals(res.data)
            })
        axiosInstance.get("bestSellers")
            .then((res) => {
                setBestSellers(res.data)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get("categoriesLimited")
            .then((res) => {
                console.log(res.data)
                setCategories(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        axiosInstance.get("activeSalesProducts")
            .then((res) => {
                dispatch(sales(res.data))
            })
    }, [])

    const paragraph = useRef(null);
    useEffect(() => {
        const typed = new Typed(paragraph.current, {
            strings: [
                "Bring Comfort<br/>Home - Style<br/>Your Space With Us!",
                "Modern Furniture For<br/>Every Space"],
            typeSpeed: 50,
            backSpeed: 40,
            showCursor: false,
            loop: true,
        });
        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <>
            <main className="body">
                {loading && <div className="d-flex justify-content-center overlay">
                    <div className="spinner-grow loader" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                <section className="home-section">
                    <div className="home-section1">
                    </div>
                    <div className="home-section1-cont d-flex justify-content-center">
                        <div className="home-paragraph typing">
                            <p className="home-paragraph1">Furnishing Dreams</p>
                            <h2 ref={paragraph}></h2>
                            <p>Furniture for the modern Home</p>
                            <Link to="/products"><button className="rounded">Discover our Collection</button></Link>
                        </div>
                    </div>
                </section>

                <section className="home-section2">
                    <div className="text-center best-seller-header">
                        <p>Customer favorites and design</p>
                        <h2>Our Best Sellers</h2>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center home-section2-carts">
                        {bestSellers.slice(0, 10).map((product) => {
                            const discountedProduct = discountedProducts.find((item) => item.product_id == product.id)
                            return (
                                <div className="col-5 col-sm-5 col-lg-3 col-xxl-2 best-seller-cart" key={product.id}>
                                    <div className="image">
                                        <Link to={`/details/${product.id}`}>
                                            <img src={baseUrl + product.image} className="w-100 h-100"></img>
                                        </Link>
                                        {/* <FontAwesomeIcon icon={faHeart} className="favorite" onClick={() => { addFavorite(product.id) }}></FontAwesomeIcon> */}
                                        {discountedProduct ?
                                            <div className="sale">{discountedProduct.discount_type == "percentage" ? `${parseFloat(discountedProduct.discount_value)}% OFF` : `$${parseFloat(discountedProduct.discount_value)} discount`}</div> :
                                            ""
                                        }
                                    </div>
                                    <div className="description">
                                        <h4>{product.product_name}</h4>
                                        <p>{product.category_name}</p>
                                        {discountedProduct ?
                                            <div className="d-flex">
                                                <h5 className="old-price">${product.price}</h5>
                                                <h5 className="new-price">${discountedProduct.discount_type == "percentage" ? (product.price * (100 - discountedProduct.discount_value)) / 100 : product.price - discountedProduct.discount_value}</h5>
                                            </div> :
                                            <h5>{product.price}</h5>
                                        }
                                        <FontAwesomeIcon icon={faHeart} className="favorite" onClick={() => { addFavorite(product.id) }}></FontAwesomeIcon>
                                    </div>
                                    <button className="w-100" disabled={product.stock === 0} onClick={() => { addToCart(product.id) }}>{product.stock === 0 ? "Sold Out" : "Add To Cart"}</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="text-center">
                        <Link to="/products"><button className="more-btn rounded">Show more</button></Link>
                    </div>
                </section>

                <section className="home-section3">
                    <div className="d-flex justify-content-between align-items-center section3-content">
                        <h3>Find the perfect furniture<br />for your home</h3>
                        <Link to="/products"><button className="rounded">Shop Now</button></Link>
                    </div>
                </section>

                <section className="home-section2">
                    <div className="text-center best-seller-header">
                        <p>Fresh design just landed</p>
                        <h2>New Arrivals</h2>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center home-section2-carts">
                        {newArrivals.slice(0, 10).map((product) => {
                            const discountedProduct = discountedProducts.find((item) => item.product_id == product.id)
                            return (
                                <div className="col-5 col-sm-5 col-lg-3 col-xxl-2 best-seller-cart" key={product.id}>
                                    <div className="image">
                                        <Link to={`/details/${product.id}`}>
                                            <img src={baseUrl + product.image} className="w-100 h-100"></img>
                                        </Link>
                                        {/* <FontAwesomeIcon icon={faHeart} className="favorite" onClick={() => { addFavorite(product.id) }}></FontAwesomeIcon> */}
                                        {discountedProduct ?
                                            <div className="sale">{discountedProduct.discount_type == "percentage" ? `${parseFloat(discountedProduct.discount_value)}% OFF` : `$${parseFloat(discountedProduct.discount_value)} discount`}</div> :
                                            ""
                                        }
                                    </div>
                                    <div className="description">
                                        <h4>{product.product_name}</h4>
                                        <p>{product.category_name}</p>
                                        {discountedProduct ?
                                            <div className="d-flex">
                                                <h5 className="old-price">${product.price}</h5>
                                                <h5 className="new-price">${discountedProduct.discount_type == "percentage" ? (product.price * (100 - discountedProduct.discount_value)) / 100 : product.price - discountedProduct.discount_value}</h5>
                                            </div> :
                                            <h5>{product.price}</h5>
                                        }
                                        <FontAwesomeIcon icon={faHeart} className="favorite" onClick={() => { addFavorite(product.id) }}></FontAwesomeIcon>
                                    </div>
                                    <button className="w-100" disabled={product.stock === 0} onClick={() => { addToCart(product.id) }}>{product.stock === 0 ? "Sold Out" : "Add To Cart"}</button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="text-center">
                        <Link to="/products"><button className="more-btn rounded">Show more</button></Link>
                    </div>
                </section>

                <section className="home-section5">
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center cards">
                        <div className="d-flex shipping align-items-center justify-content-center py-3 py-md-0">
                            <FontAwesomeIcon icon={faTruck} className="icons"></FontAwesomeIcon>
                            <h4 className="m-0">Free Shipping</h4>
                        </div>
                        <div className="d-flex clock align-items-center justify-content-center py-3 py-md-0">
                            <FontAwesomeIcon icon={faClock} className="icons"></FontAwesomeIcon>
                            <h4 className="m-0">Support 24/7</h4>
                        </div>
                        <div className="d-flex money align-items-center justify-content-center py-3 py-md-0">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="icons"></FontAwesomeIcon>
                            <h4 className="m-0">Money return</h4>
                        </div>
                    </div>
                </section>

                <section className="home-section6">
                    <div className="text-center home-categories">
                        <p>Furniture picks every room style</p>
                        <h2>Shop by categories</h2>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap">
                        {categories.map((category) => {
                            return (
                                <Link to={`/category-products/${category.id}`} className="category-link col-11 col-sm-5 col-lg-3 col-xxl-2 text-center home-category"><div key={category.id} className="">{category.category_name}</div></Link>
                            )
                        })}
                    </div>
                    {/* <div className="text-center">
                        <button className="more-btn2 rounded">More categories</button>
                    </div> */}
                </section>
            </main>
        </>
    )
}

export default Home;