import React from "react";
import "./checkout.css";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { notifications } from "../../store/actions/notifications";

const Checkout = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.userData)
    const loading = useSelector((state) => state.loader.isLoading)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const discountedProducts = useSelector((state) => state.sales.sales)
    const quantities = JSON.parse(localStorage.getItem(`quantities_${user.id}`)) || {};
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
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({
        id: user.id,
        address: user.address,
        items: cartItems,
        quantity: quantities,
        total_price: total
    })

    const handleChange = (event) => {
        setData({ ...data, address: event.target.value })
    }

    const validation = () => {
        let newErrors = {}
        if (user.username == "") {
            newErrors.username = "Username is required"
        }

        if (user.email == "") {
            newErrors.email = "Email is required"
        }

        if (user.phone == "") {
            newErrors.phone = "Phone is required"
        }

        if (data.address == "") {
            newErrors.address = "Address is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        if (isValid) {
            axiosInstance.post("order", data)
                .then((res) => {
                    axiosInstance.get(`notifications/${user.id}`)
                    .then((res) => {
                        dispatch(notifications(res.data))
                    })
                })
        }
        else {
            e.preventDefault();
            console.log("invalid")
        }
    }

    return (
        <>
            <main className="checkout-main body content">
                {loading && <div className="d-flex justify-content-center overlay">
                    <div className="spinner-grow loader" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                <form method="post" className="d-flex flex-column flex-md-row justify-content-between" onSubmit={handleSubmit}>
                    <section className="col-12 col-md-7 billing-details">
                        <h3>Billing Details</h3>
                        <div>
                            <div className="d-flex flex-column inputs">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" value={user.username} required readOnly />
                                <div className="error">{errors.username}</div>
                            </div>
                            <div className="d-flex flex-column inputs">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={user.email} readOnly required />
                                <div className="error">{errors.email}</div>
                            </div>
                            <div className="d-flex flex-column inputs">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" id="phone" name="phone" value={user.phone} readOnly required />
                                <div className="error">{errors.phone}</div>
                            </div>
                            <div className="d-flex flex-column inputs">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" value={data.address} onChange={(e) => handleChange(e)} />
                                <div className="error">{errors.address}</div>
                            </div>
                        </div>
                    </section>

                    <section className="col-12 col-md-4 order d-flex flex-column justify-content-center">
                        <h4 className="text-center">Your Order</h4>
                        <div className="d-flex justify-content-between titles">
                            <div>Product</div>
                            <div>Subtotal</div>
                        </div>
                        <hr />
                        {cartItems.map((product) => {
                            const qty = quantities[product.item_id] || 1;
                            const discountedProduct = discountedProducts.find((item) => item.product_id == product.product_id)
                            return (
                                <div className="d-flex justify-content-between" key={product.item_id}>
                                    <div className="product-name">{product.product_name} <span>x</span> {qty}</div>
                                    <div className="d-flex align-items-center justify-content-end">
                                        <div className={discountedProduct ? `old-price` : `price`}>{product.price * qty}</div>
                                        <div className="new-price">{discountedProduct ? discountedProduct.discount_type == "percentage" ? ((product.price * (100 - discountedProduct.discount_value)) / 100) * qty : (product.price - discountedProduct.discount_value) * qty : ""}</div>
                                    </div>
                                </div>
                            )
                        })}
                        <hr />
                        <div className="d-flex justify-content-between total">
                            <div className="titles">Total</div>
                            <div className="price">{total}</div>
                        </div>
                        <input type="submit" className="place-order w-100" value="Place Order" />
                    </section>
                </form>
            </main>
        </>
    )
}

export default Checkout;