import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import "./orders.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faUser, faCartShopping, faHeart, faBell, faXmark, faPencil, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../../axios config/axiosinstance";
import AsideDashboard from "../aside";
import FooterDashboard from "../footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import preparing from "../../../assets/prepare.jfif";
import delivered from "../../../assets/delivered.jpg";
import cancelled from "../../../assets/cancel.png";
import DashHeader from "../dashHeader";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const OrderDetails = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const steps = ["pending", "shipped", "completed", "cancelled"];
    const loading = useSelector((state) => state.loader.isLoading)
    const dispatch = useDispatch()
    const [order, setOrder] = useState([])
    const currentStep = steps.findIndex((s) => s === order.status)
    const [orderItems, setOrderItems] = useState([])
    const [orderUser, setOrderUser] = useState([])
    const params = useParams()
    const [loc, setLoc] = useState(null);
    const [message, setMessage] = useState("")
    const deliveryId = 1;
    const [driver, setDriver] = useState([])
    const [formData, setFormData] = useState({
        id: "",
        status: "",
        userId: "",
        order_code: ""
    })

    useEffect(() => {
        axiosInstance.get(`order/${params.id}`)
            .then((res) => {
                setOrder(res.data[0])
                setFormData({
                    ...formData,
                    id: res.data[0].id,
                    status: res.data[0].status,
                    userId: res.data[0].user_id,
                    order_code: res.data[0].order_code
                });
            })
        axiosInstance.get(`orderItems/${params.id}`)
            .then((res) => {
                setOrderItems(res.data)
            })
        axiosInstance.get(`orderUser/${params.id}`)
            .then((res) => {
                setOrderUser(res.data[0])
            })
        axiosInstance.get(`driver/${params.id}`)
            .then((res) => {
                setDriver(res.data[0])
            })
    }, [message])

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await axiosInstance.get(`delivery/${params.id}/latest-location`);
                if (res.status === 200 && res.data) {
                    setLoc(res.data);
                }
            } catch (err) {
                console.log("No location data yet or connection error ❌");
            }
        };

        fetchLatest();

        const interval = setInterval(fetchLatest, 5000);
        return () => clearInterval(interval);
    }, [deliveryId]);

    const changeStatus = () => {
        axiosInstance.post("status", formData)
            .then((res) => {
                setMessage(res.data.message)
            })
    }

    const handleChange = (event) => {
        // setFormData({
        //     ...formData,
        //     [event.target.name]: event.target.value
        // })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // axiosInstance.post("editCategory",formData)
        // .then((res)=>{
        //     setMessage(res.data.message)
        // })
    }

    const lat = loc?.latitude
        ? parseFloat(loc.latitude)
        : parseFloat(loc?.location?.latitude);

    const lng = loc?.longitude
        ? parseFloat(loc.longitude)
        : parseFloat(loc?.location?.longitude);

    return (
        <>
            <div className="d-flex">
                <AsideDashboard></AsideDashboard>
                <div className="col-9 col-md-10 page-wrapper">
                    <DashHeader></DashHeader>
                    <main className="category-main content">
                        {/* {loading && <div className="d-flex justify-content-center overlay">
                            <div className="spinner-grow loader" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>} */}
                        <section className="order-info">
                            <h3 className="">Order #{order.order_code}</h3>
                            <div>
                                <div className="customer">
                                    <h4>Customer Details</h4>
                                    <div>
                                        <div>
                                            <h5 className="name">Customer Name:</h5>
                                            <p>{orderUser.username}</p>
                                        </div>
                                        <div className="d-flex flex-column flex-md-row justify-content-between information">
                                            <div>
                                                <h5>Email:</h5>
                                                <p>{orderUser.email}</p>
                                            </div>
                                            <div>
                                                <h5>Phone:</h5>
                                                <p>{orderUser.phone}</p>
                                            </div>
                                            <div>
                                                <h5>Address:</h5>
                                                <p>{orderUser.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shipping">
                                    <h4>Order Status</h4>
                                    <p className="text-center message">{message}</p>
                                    <div className="progress-container col-12">
                                        {steps.map((step, index) => (
                                            <div key={index} className="progress-step">
                                                <div
                                                    className={`circle ${index <= currentStep ? "active" : ""
                                                        }`}
                                                >
                                                    {index <= currentStep ? "✓" : ""}
                                                </div>
                                                <p className={`label ${index <= currentStep ? "bold" : ""}`}>{step}</p>
                                                {index < steps.length - 1 && (
                                                    <div
                                                        className={`line ${index < currentStep + 1 ? "active" : ""}`}
                                                    ></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="d-flex">
                                        <button className={`change-status ${order.status != "cancelled" && order.status != "completed" ? "" : "display"}`} onClick={changeStatus}>{steps[currentStep + 1]}</button>
                                    </div>
                                </div>
                                <div className="summary">
                                    <h4>Order Summary</h4>
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="col-4 item">Product</th>
                                                    <th className="col-2">Price</th>
                                                    <th className="col-2">Discounted price</th>
                                                    <th className="col-1">Quantity</th>
                                                    <th className="col-1">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderItems.map((item) => {
                                                    return (
                                                        <tr key={item.product_id}>
                                                            <td className="d-flex align-items-center item">
                                                                <div className="d-flex align-items-center w-100 product">
                                                                    <img src={baseUrl + item.image} className="h-auto" />
                                                                    <div className="">{item.product_name}</div>
                                                                </div>
                                                            </td>
                                                            <td className="">${item.price}</td>
                                                            <td className="">${item.discounted_price}</td>
                                                            <td className="">{item.quantity}</td>
                                                            <td className="">{item.total}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex align-items-center order-total">
                                        <h6>Total</h6>
                                        <p>{order.total_price}</p>
                                    </div>
                                </div>
                                <div className="order-tracking">
                                    <h4>Shipment Tracking</h4>
                                    <div className="col-12 col-lg-12 mt-lg-12 d-flex flex-col justify-content-center">
                                        {order.status === "shipped" && loc ?
                                            <>
                                            <div className="col-12 col-lg-12 mt-lg-12 d-flex flex-column">
                                                <div className="driver-info d-flex justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <h6>Driver Name:</h6>
                                                        <p>{driver.username}</p>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <h6>Phone:</h6>
                                                        <p>{driver.phone}</p>
                                                    </div>
                                                </div>
                                                <div className="w-100">
                                                    <div className="map">
                                                        <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                                                            <TileLayer
                                                                url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
                                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                            />
                                                            {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                                                            <Marker position={[lat, lng]}>
                                                                <Popup>
                                                                    Last update 🕒: {loc.created_at}<br /> Delivery is here 🚚 || ""
                                                                </Popup>
                                                            </Marker>
                                                        </MapContainer>
                                                    </div>
                                                </div>
                                                </div></>
                                            : order.status === "pending" ? (
                                                <motion.div className="tracking-placeholder text-center"
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                                    <img src={preparing} alt="Preparing order" />
                                                    <h4>Order is being prepared</h4>
                                                    <p>Once it’s shipped, you’ll be able to track it live here.</p>
                                                </motion.div>)
                                                : order.status === "completed" ? (
                                                    <motion.div className="tracking-placeholder text-center"
                                                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
                                                        <img src={delivered} alt="Delivered" width="250" />
                                                        <h4>Order Delivered</h4>
                                                        {/* <p>We hope you love your new furniture!</p> */}
                                                    </motion.div>)
                                                    : order.status === "cancelled" ? (
                                                        <motion.div className="tracking-placeholder text-center"
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                                                            <img src={cancelled} alt="Cancelled" width="200" />
                                                            <h4>Order Cancelled</h4>
                                                            <p>This order has been cancelled.</p>
                                                        </motion.div>)
                                                        : ""}

                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <FooterDashboard></FooterDashboard>
                </div>
            </div >
        </>
    )
}

export default OrderDetails;