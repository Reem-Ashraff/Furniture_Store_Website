import React from "react";
import "./login.css";
import { useState } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../store/actions/user";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";
import { notifications } from "../../store/actions/notifications";
import background from "../../assets/background6.jpg";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const loading = useSelector((state) => state.loader.isLoading)
    // const userData = useSelector((state) => state.user.userData)
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const changeShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const validation = () => {
        let newErrors = {}

        if (formData.email == "") {
            newErrors.email = "Email is required"
        }

        if (formData.password == "") {
            newErrors.password = "Password is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        console.log(isValid)
        if (isValid) {
            axiosInstance.post("user", formData)
                .then((res) => {
                    dispatch(user(res.data.user_data))
                    if (res.data.message == "loged in successfully") {
                        setMessage("")
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
                        //history.push("/home")
                        // return <ProtectedRoute></ProtectedRoute>
                        if(res.data.user_data.role === "admin"){
                            history.push("/dashboard/home")
                        }
                        else if(res.data.user_data.role === "user"){
                            history.push("/home")
                        }
                        else if(res.data.user_data.role === "driver"){
                            history.push("/driver-page")
                        }
                    }
                    else {
                        setMessage(res.data.message)
                    }
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
                    <div className="col-12 col-lg-6 form-section d-flex flex-column align-items-center justify-content-center">
                        <h2 className="text-center"><span>Welcome To Furniture Store!</span><br />Login</h2>
                        <div className="text-center red message">{message}</div>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="d-flex flex-column inputs">
                                <input type="email" id="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleChange(e)} required />
                                <div className="error">{errors.email}</div>
                            </div>
                            <div className="d-flex flex-column inputs pass">
                                    <input type={showPassword ? "text" : "password"} id="pass" placeholder="Password" name="password" value={formData.password} onChange={(e) => handleChange(e)} required />
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="eye" onClick={changeShowPassword}></FontAwesomeIcon>
                                <div className="error">{errors.password}</div>
                            </div>
                            <input type="submit" className="submit" value="Log In" />
                            <div className="d-flex text">
                                <p>Don't have an account?</p>
                                <Link to="/signup" className="link"><p>Sign Up</p></Link>
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
                        <div className="msg text-center">{message}</div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.email}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="pass">Password</label>
                            <input type="password" id="pass" name="password" value={formData.password} onChange={(e) => handleChange(e)} required />
                            <div className="error">{errors.password}</div>
                        </div>
                        <input type="submit" className="submit" value="Log In" />
                        <div className="d-flex text">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="link"><p>Sign Up</p></Link>
                        </div>
                    </form>
                </section>
            </main> */}
        </>
    )
}

export default Login;