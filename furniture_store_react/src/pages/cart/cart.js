import React from "react";
import "./cart.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "../../store/actions/cart";
import Table from "../../assets/Seito-Wood-Table.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Cart = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const [quantities, setQuantities] = useState({})
    const cartItems = useSelector((state) => state.cart.cartItems)
    const loading = useSelector((state) => state.loader.isLoading)
    const userId = useSelector((state) => state.user.userData.id)
    const dispatch = useDispatch()
    const discountedProducts = useSelector((state) => state.sales.sales)
    const total = cartItems.reduce((acc, product) => {
        const qty = quantities[product.item_id] || 1;
        const discountedProduct = discountedProducts.find(
            (item) => item.product_id == product.product_id
        );
        let finalPrice;
        if (discountedProduct) {
            if (discountedProduct.discount_type === "percentage") {
                finalPrice = ((product.price * (100 - discountedProduct.discount_value)) / 100) * qty;
            } else {
                finalPrice = (product.price - discountedProduct.discount_value) * qty;
            }
        } else {
            finalPrice = product.price * qty;
        }

        return acc + finalPrice;
    }, 0);

    useEffect(() => {
        if (userId) {
            const saved = localStorage.getItem(`quantities_${userId}`);
            if (saved) {
                setQuantities(JSON.parse(saved));
            }
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            localStorage.setItem(`quantities_${userId}`, JSON.stringify(quantities));
        }
    }, [quantities, userId]);

    const deleteItem = (itemId) => {
        axiosInstance.delete(`cartItem/${itemId}`)
            .then((res) => {
                axiosInstance.get(`cartItems/${userId}`)
                    .then((response) => {
                        dispatch(cart(response.data))
                    })
            })
    }

    const minus = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) - 1, 1)
        }));
    };

    const plus = (id) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
    };

    return (
        <>
            <main className="wishlist body content">
                <section className="title">
                    <h2 className="text-center">Cart Items</h2>
                </section>

                <section className="d-flex justify-content-center">
                    {loading && <div className="d-flex justify-content-center overlay">
                        <div className="spinner-grow loader" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    {cartItems.length == 0
                        ? <div className="no-text">No Products In The Cart</div> :
                        <div className="d-flex flex-column flex-md-row col-12 justify-content-between cart-table">
                            <table className="cart col-12 col-md-9 mb-3 mb-md-0">
                                <thead>
                                    <tr>
                                        <th className=""></th>
                                        <th className="col-5">Product</th>
                                        <th className="col-2">Price</th>
                                        <th className="col-2">Quantity</th>
                                        <th className="col-2">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((product) => {
                                        const qty = quantities[product.item_id] || 1;
                                        const discountedProduct = discountedProducts.find((item) => item.product_id == product.id)
                                        return (
                                            <tr key={product.item_id}>
                                                <td className="text-center"><FontAwesomeIcon icon={faXmark} className="delete rounded-circle" onClick={() => { deleteItem(product.item_id) }}></FontAwesomeIcon></td>
                                                <td className="d-flex align-items-center">
                                                    <Link to={`/details/${product.product_id}`} className="link">
                                                        <div className="d-flex align-items-center w-100 product">
                                                            <img src={baseUrl + product.image} className="h-auto" />
                                                            <div className="">{product.product_name}</div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="cart-price">
                                                    {discountedProduct ?
                                                        <div className="d-flex align-items-center">
                                                            <div className="old-price">${product.price}</div>
                                                            <div className="new-price">${discountedProduct.discount_type == "percentage" ? (product.price * (100 - discountedProduct.discount_value)) / 100 : product.price - discountedProduct.discount_value}</div>
                                                        </div> :
                                                        <div>{product.price}</div>
                                                    }
                                                </td>
                                                <td className="text-center">
                                                    <div className="d-flex quantity">
                                                        <span onClick={() => { minus(product.item_id) }}>-</span><input type="text" value={qty} readOnly /><span onClick={() => { plus(product.item_id) }}>+</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    {discountedProduct ?
                                                        <div className="d-flex align-items-center">
                                                            ${discountedProduct.discount_type == "percentage" ? (product.price * ((100 - discountedProduct.discount_value)) / 100) * qty : (product.price - discountedProduct.discount_value) * qty}
                                                        </div> :
                                                        <div>${product.price * qty}</div>
                                                    }
                                                </td>
                                                {/* <td>${(qty > 1) ? qty * product.price : product.price}</td> */}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="col-12 col-md-3 ms-md-3 cart-div">
                                <div className="div-head">Cart totals</div>
                                <div className="d-flex justify-content-between align-items-center sub-div">
                                    <div>Subtotal</div>
                                    <p className="mb-0">{total}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center total-div">
                                    <div>Total</div>
                                    <p className="mb-0">{total}</p>
                                </div>
                                <div className="text-center checkout-div"><Link to="/checkout" className="checkout-btn">Proceed to checkout</Link></div>
                            </div>
                        </div>
                    }
                </section>
            </main>
        </>
    )
}

export default Cart;