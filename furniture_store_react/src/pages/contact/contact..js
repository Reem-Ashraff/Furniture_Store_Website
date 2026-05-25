import React from "react";
import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faClock, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useState } from "react";
import axiosInstance from "../../axios config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../store/actions/user";
import { favorites } from "../../store/actions/favorites";
import { cart } from "../../store/actions/cart";
import { notifications } from "../../store/actions/notifications";
import { useHistory } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const Contact = () => {
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.user.userData)
    const loading = useSelector((state) => state.loader.isLoading)
    // const userData = useSelector((state) => state.user.userData)
    const [message, setMessage] = useState("")
    const [formData, setFormData] = useState({
        email: userData.email,
        message: ""
    })
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const validation = () => {
        let newErrors = {}

        if (formData.email == "") {
            newErrors.email = "Email is required"
        }

        if (formData.message == "") {
            newErrors.message = "Message is required"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        if (isValid) {
            axiosInstance.post("message", formData)
                .then((res) => {
                    setMessage(res.data.message)
                })
        }
        else {
            e.preventDefault();
            console.log("invalid")
        }
    }
    return (
        <>
            <main className="content orders-main body">
                <section className="contact-form">
                    <h2>Contact Us</h2>
                    <div className="d-flex flex-column flex-md-row">
                        <div className="col-12 col-md-6 img-div"></div>
                        <div className=" col-12 col-md-6 text-div">
                            <div className="text-center green message">{message}</div>
                            <form method="post" onSubmit={handleSubmit}>
                                <div className="d-flex flex-column inputs">
                                    <input type="email" id="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleChange(e)} readOnly />
                                    <div className="error">{errors.email}</div>
                                </div>
                                <div className="d-flex flex-column inputs pass">
                                    <input type= "text" id="pass" placeholder="Message" name="message" value={formData.message} onChange={(e) => handleChange(e)} required />
                                    <div className="error">{errors.message}</div>
                                </div>
                                <input type="submit" className="submit" value="Send Message" />
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Contact;