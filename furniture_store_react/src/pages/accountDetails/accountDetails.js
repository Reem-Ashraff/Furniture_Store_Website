import React, { useEffect, useState } from "react";
import "./accountDetails.css";
import axiosInstance from "../../axios config/axiosinstance";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ProfileAside from "../profileAside/profileAside";
import { user } from "../../store/actions/user";
import { useHistory } from "react-router-dom";

const AccountDetails = () => {
    const history = useHistory()
    const userdata = useSelector((state) => state.user.userData)
    const loading = useSelector((state) => state.loader.isLoading);
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: userdata.username,
        email: userdata.email,
        phone: userdata.phone,
        address: userdata.address
    })
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")

    const handleEdit = () => {
        setEdit(!edit)
    }

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
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

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validation();
        if (isValid) {
            axiosInstance.post(`editUser/${userdata.id}`, formData)
                .then((res) => {
                    setMessage(res.data.message)
                    // dispatch(user(res.data.user_data))
                    setEdit(false)
                    // history.push("/details")
                })
        }
        else {
            e.preventDefault();
            console.log("invalid")
        }
    }

    return (
        <>
            <main className="content orders-main body d-flex flex-column flex-md-row">
                <ProfileAside></ProfileAside>
                <section className="col">
                    <div className="d-flex justify-content-between align-items-center account-details">
                        <h2 className="mb-0">Account Details</h2>
                        {!edit ?
                            <button className="details-edit" onClick={handleEdit}>Edit</button> : ""
                        }
                    </div>
                    {loading && <div className="d-flex justify-content-center overlay">
                        <div className="spinner-grow loader" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                    <div className="text-center message">{message}</div>
                    <form className="details-form" method="post" onSubmit={handleSubmit}>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" placeholder="Username" name="username" value={formData.username} onChange={(e) => handleChange(e)} readOnly={!edit} />
                            <div className="error">{errors.username}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Email" name="email" value={formData.email} onChange={(e) => handleChange(e)} readOnly={!edit} />
                            <div className="error">{errors.email}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" id="phone" placeholder="Phone" name="phone" value={formData.phone} onChange={(e) => handleChange(e)} readOnly={!edit} />
                            <div className="error">{errors.phone}</div>
                        </div>
                        <div className="d-flex flex-column inputs">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" placeholder="Address" name="address" value={formData.address} onChange={(e) => handleChange(e)} readOnly={!edit} />
                            <div className="error">{errors.address}</div>
                        </div>
                        {edit ?
                            <input type="submit" className="submit" value="Save" /> : ""
                        }
                    </form>
                </section>
            </main>
        </>
    );
};

export default AccountDetails;