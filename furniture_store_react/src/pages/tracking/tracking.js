import React, { useEffect, useState } from "react";
import "./tracking.css";
import axiosInstance from "../../axios config/axiosinstance";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { Check, XCircle } from "lucide-react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import preparing from "../../assets/prepare.jfif";
import delivered from "../../assets/delivered.jpg";
import cancelled from "../../assets/cancel.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Tracking = () => {
    const baseUrl = "http://localhost/furniture-store-laravel/storage/app/public/"
    const params = useParams()
    const deliveryId = 1;
    const userId = useSelector((state) => state.user.userData.id)
    const loading = useSelector((state) => state.loader.isLoading);
    const [loc, setLoc] = useState(null);
    const [order, setOrder] = useState([])
    const [items, setItems] = useState([])
    const [driver, setDriver] = useState([])
    const [total, setTotal] = useState()
    const steps = ['pending', 'shipped', 'completed', 'cancelled']
    const currentStep = steps.findIndex((s) => s === order.status)

    // console.log(items[0].total_price)

    useEffect(() => {
        axiosInstance.get(`orderDetails/${params.id}`)
            .then((res) => {
                setOrder(res.data)
            })
        axiosInstance.get(`orderItems/${params.id}`)
            .then((response) => {
                setItems(response.data)
                setTotal(response.data[0].total_price)
            })
        axiosInstance.get(`driver/${params.id}`)
            .then((res) => {
                setDriver(res.data)
            })
    }, [])

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await axiosInstance.get(`delivery/${params.id}/latest-location`);
                if (res.status === 200 && res.data) {
                    setLoc(res.data);
                }
            } catch (err) {
                console.log("No location data yet or connection error!");
            }
        };

        fetchLatest();

        const interval = setInterval(fetchLatest, 5000);
        return () => clearInterval(interval);
    }, []);

    // if (!loc) return <div style={{ textAlign: "center", marginTop: "30px" }}>There is no data for the location yet</div>;

    // if (!loc) return <div>There is no data for the location yet</div>;

    const lat = loc?.latitude
        ? parseFloat(loc.latitude)
        : parseFloat(loc?.location?.latitude);

    const lng = loc?.longitude
        ? parseFloat(loc.longitude)
        : parseFloat(loc?.location?.longitude);

    // if (isNaN(lat) || isNaN(lng)) {
    //     return <div>No correct coordinates received yet ⚠️</div>;
    // }

    return (
        <main className="tracking-main content body">
            <section className="d-flex justify-content-between flex-wrap">
                <div className="col-12 col-lg-6 tracking-details pe-lg-5">
                    <h2>Order Tracking</h2>
                    <div className="code"><span>Order: </span>#{order.order_code}</div>
                    <div className="progress-container">
                        {steps.map((step, index) => (
                            <div key={index} className="progress-step">
                                <div className={`circle ${index <= currentStep ? "active" : ""}`}>
                                    {index <= currentStep ? "✓" : ""}
                                </div>

                                <p className={`label ${index <= currentStep ? "bold" : ""}`}>
                                    {step}
                                </p>

                                {index <= steps.length - 2 && (
                                    <div className={`line ${index <= currentStep ? "active" : ""}`}>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="order-details">
                        <h4>Order Details:</h4>
                        <div className="d-flex justify-content-between titles">
                            <div>Product</div>
                            <div>Subtotal</div>
                        </div>
                        <hr />
                        {items.map((item) => {
                            return (
                                <div className="d-flex justify-content-between" key={item.item_id}>
                                    <div className="product-name">{item.product_name} <span>x</span> {item.quantity}</div>
                                    <div className="price">{item.total}</div>
                                </div>
                            )
                        })}
                        <hr />
                        <div className="d-flex justify-content-between total">
                            <div className="titles">Total</div>
                            <div className="price">{total}</div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6 mt-4 mt-lg-0 d-flex flex-col justify-content-center">
                    {order.status === "shipped" && loc ?
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
                            <div className="driver d-flex justify-content-between align-items-center">
                                <div className="username"><span>Driver Name:</span> {driver[0].username||""}</div>
                                <div className="phone"><span><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon></span> {driver[0].phone || ""}</div>
                            </div>
                        </div>
                        : order.status === "pending" ? (
                            <motion.div className="tracking-placeholder text-center"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <img src={preparing} alt="Preparing order" />
                                <h4>Your order is being prepared</h4>
                                <p>Once it’s shipped, you’ll be able to track it live here.</p>
                            </motion.div>)
                            : order.status === "completed" ? (
                                <motion.div className="tracking-placeholder text-center"
                                    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
                                    <img src={delivered} alt="Delivered" width="250" />
                                    <h4>Order Delivered</h4>
                                    <p>We hope you love your new furniture!</p>
                                </motion.div>)
                                : order.status === "cancelled" ? (
                                    <motion.div className="tracking-placeholder text-center"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                                        <img src={cancelled} alt="Cancelled" width="200" />
                                        <h4>Order Cancelled</h4>
                                        <p>This order has been cancelled. If you have any questions, contact support.</p>
                                    </motion.div>)
                                    : ""}

                </div>
            </section>
        </main >
    );
};

export default Tracking;