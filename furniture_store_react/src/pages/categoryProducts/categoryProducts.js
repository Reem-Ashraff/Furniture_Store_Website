import React, { useEffect, useState } from "react";
import "./categoryProducts.css";
import axiosInstance from "../../axios config/axiosinstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "../../assets/Seito-Wood-Table.jpg";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";

const CategoryProducts = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const discountedProducts = useSelector((state) => state.sales.sales)
    const loading = useSelector((state) => state.loader.isLoading)
    const userId = useSelector((state) => state.user.userData.id)
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
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

    const handleSearch = () => {
        if (query != "") {
            setProducts([])
            axiosInstance.get(`search/${query}`)
                .then((res) => {
                    console.log(res.data)
                    setProducts(res.data)
                    //console.log(products)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        axiosInstance.get(`product/${params.id}`)
            .then((res) => {
                setProducts(res.data)
                console.log(products)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <main className="products-main body content">
                <section className="d-flex justify-content-between align-items-center category-select">
                        <h2>{products.length > 0 ? products[0].category_name : ""}</h2>
                </section>

                <section className="">
                    {(loading) ?
                        <div className="d-flex justify-content-center align-items-center overlay">
                            <div className="spinner-grow loader" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div> :
                        <div className="d-flex flex-wrap justify-content-center home-section2-carts">
                            {/* {products.length == 0?<div>No Prooduct</div>:<div></div>} */}
                            {products.length == 0
                                ? <div className="no-text">There is no products.</div> :
                                products.map((product) => {
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
                        </div>}
                </section>
            </main>
        </>
    )
}

export default CategoryProducts;