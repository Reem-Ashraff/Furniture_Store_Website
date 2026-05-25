import React from "react";
import "./favorites.css";
import { useState } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import Table from "../../assets/Seito-Wood-Table.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Favorites = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const favProducts = useSelector((state) => state.favorites.favorites)
    const loading = useSelector((state) => state.loader.isLoading)
    const userId = useSelector((state) => state.user.userData.id)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        "user_id": userId,
        "product_id": ""
    })

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

    const deleteFavorite = (favoriteId) => {
        axiosInstance.delete(`favorite/${favoriteId}`)
            .then((res) => {
                axiosInstance.get(`favorites/${userId}`)
                    .then((response) => {
                        dispatch(favorites(response.data))
                    })
            })
    }

    return (
        <>
            <main className="wishlist body content">
                <section className="title">
                    <h2 className="text-center">Favorites</h2>
                </section>

                <section className="d-flex justify-content-center table">
                    {loading && <div className="d-flex justify-content-center overlay">
                        <div className="spinner-grow loader" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    {favProducts.length == 0
                        ? <div className="no-text">No Favorite Products</div> :
                        <table className="fav">
                            <thead>
                                <tr>
                                    <th className=""></th>
                                    <th className="col-4">Product</th>
                                    <th className="col-2">Price</th>
                                    <th className="col-2">Stock</th>
                                    <th className="col-3"></th>
                                </tr>
                            </thead>
                            {favProducts.map((product) => {
                                return (
                                    <tbody key={product.product_id}>
                                        <tr>
                                            <td className="text-center"><FontAwesomeIcon icon={faXmark} className="delete rounded-circle" onClick={() => { deleteFavorite(product.favorite_id) }}></FontAwesomeIcon></td>
                                            <td className="d-flex align-items-center">
                                                <Link to={`/details/${product.product_id}`} className="link">
                                                    <div className="d-flex align-items-center w-100 product">
                                                        <img src={baseUrl + product.image} className="h-auto" />
                                                        <div className="">{product.product_name}</div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="">${product.price}</td>
                                            <td className={(product.stock == 0) ? "red" : "green"}>{(product.stock == 0) ? "Sold out" : "In Stock"}</td>
                                            <td className="text-center"><button disabled={product.stock === 0} onClick={() => { addToCart(product.product_id) }}>{product.stock === 0 ? "Sold Out" : "Add To Cart"}</button></td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    }
                </section>
            </main>
        </>
    )
}

export default Favorites;