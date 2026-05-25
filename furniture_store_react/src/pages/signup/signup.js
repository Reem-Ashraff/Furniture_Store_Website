import React from "react";
import "./signup.css";
import { useState } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../store/actions/user";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { notifications } from "../../store/actions/notifications";
import background from "../../assets/background6.jpg";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Signup = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const loading = useSelector((state) => state.loader.isLoading)
    const userData = useSelector((state) => state.user.userData)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const changeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const changeShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const validation = () => {
        let newErrors = {}
        if (formData.username == "") {
            newErrors.username = "Username is required"
        }
        else if (formData.username.length < 5) {
            newErrors.username = "Username is too short"
        }

        if (formData.email == "") {
            newErrors.email = "Email is required"
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (formData.phone == "") {
            newErrors.phone = "Phone is required"
        }
        else if (!/^[0-9]{11}$/.test(formData.phone)) {
            newErrors.phone = "Phone must be 11 digits"
        }

        if (formData.address == "") {
            newErrors.address = "Address is required"
        }

        if (formData.password == "") {
            newErrors.password = "Password is required"
        }
        else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (formData.confirmPassword == "") {
            newErrors.confirmPassword = "Confirm Password is required"
        }
        else if (formData.confirmPassword != formData.password) {
            newErrors.confirmPassword = "Passwords do not match"
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        if (isValid) {
            axiosInstance.post("addUser", formData)
                .then((res) => {
                    setMessage(res.data.message)
                    dispatch(user(res.data.user_data))
                    axiosInstance.get(`favorites/${res.data.user_data.id}`)
                        .then((response) => {
                            dispatch(favorites(response.data))
                        })
                    axiosInstance.get(`cartItems/${res.data.user_data.id}`)
                        .then((response) => {
                            dispatch(cart(response.data))
                        })
                    axiosInstance.get(`notifications/${res.data.user_data.id}`)
                        .then((res) => {
                            dispatch(notifications(res.data))
                        })
                    history.push("/home")
                })
        }
        else {
            e.preventDefault();
            console.log("invalid")
        }
    }

    return (
        <>
            <main className="signup-main">
                <section className="signup-section d-flex flex-column-reverse flex-lg-row justify-content-end">
                    <div className="col-12 col-lg-6 form-section d-flex flex-column align-items-center">
                        <h2 className="text-center"><span>Welcome To Furniture Store!</span><br />Register</h2>
                        <div className="text-center message">{message}</div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="d-flex flex-column inputs">
                                {/* <label htmlFor="username">Username</label> */}
                                <input type="text" id="username" placeholder="Username" name="username" value={formData.username} onChange={(e) => handleChange(e)} />
                                <div className="error">{errors.username}</div>
                            </div>
                            <div className="d-flex flex-column inputs">
                                {/* <label htmlFor="email">Email</label> */}
                                <input type="email" id="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleChange(e)} required />
                                <div className="error">{errors.email}</div>
                            </div>
                            <div className="d-flex flex-column inputs">
                                {/* <label htmlFor="phone">Phone</label> */}
                                <input type="text" id="phone" placeholder="Phone" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} required />
                                <div className="error">{errors.phone}</div>
                            </div>
                            <div className="d-flex flex-column inputs">
                                {/* <label htmlFor="address">Address</label> */}
                                <input type="text" id="address" placeholder="Address" name="address" value={formData.address} onChange={(e) => handleChange(e)} required />
                                <div className="error">{errors.address}</div>
                            </div>
                            <div className="d-flex flex-column inputs pass">
                                {/* <label htmlFor="pass">Password</label> */}
                                <input type={showPassword ? "text" : "password"} id="pass" placeholder="Password" name="password" value={formData.password} onChange={(e) => handleChange(e)} required />
                                <FontAwesomeIcon icon={showPassword? faEye:faEyeSlash} className="eye" onClick={changeShowPassword}></FontAwesomeIcon>
                                <div className="error">{errors.password}</div>
                            </div>
                            <div className="d-flex flex-column inputs pass">
                                {/* <label htmlFor="passConfirm">Confirm Password</label> */}
                                <input type={showConfirmPassword ? "text" : "password"} id="passConfirm" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChange(e)} required />
                                <FontAwesomeIcon icon={showConfirmPassword? faEye:faEyeSlash} className="eye" onClick={changeShowConfirmPassword}></FontAwesomeIcon>
                                <div className="error">{errors.confirmPassword}</div>
                            </div>
                            <input type="submit" className="submit" value="Sign Up" />
                            <div className="d-flex text">
                                <p>Already have an account?</p>
                                <Link to="/login" className="link"><p>Login</p></Link>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 col-lg-6 image-section">
                        <img src={background} className="w-100 h-100" />
                    </div>
                </section>
            </main>
            {/* <main className="signup-main body">
                <section className="head">
                    <h2 className="text-center">My Account</h2>
                </section>

                <section className="form-section d-flex justify-content-center">
                    {loading && <div className="d-flex justify-content-center overlay">
                        <div className="spinner-grow loader" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    <form className="w-75" method="post" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={(e) => handleChange(e)} />
                            <div className="error">{errors.username}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.email}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.phone}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.address}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" name="password" value={formData.password} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.password}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="passConfirm">Confirm Password</label>
                            <input type="password" id="passConfirm" name="confirmPassword" value={formData.confirmPassword} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.confirmPassword}</div>
                        </div>
                        <input type="submit" className="submit" value="Sign Up" />
                        <div className="d-flex text">
                            <p>Already have an account?</p>
                            <Link to="/login" className="link"><p>Login</p></Link>
                        </div>
                    </form>
                </section>
            </main> */}
        </>
    )
}

export default Signup;