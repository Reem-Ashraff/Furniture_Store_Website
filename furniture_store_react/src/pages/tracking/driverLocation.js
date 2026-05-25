import React, { useEffect, useState } from "react";
import "./tracking.css";
import axiosInstance from "../../axios config/axiosinstance";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import DashHeader from "../dashboard/dashHeader";
import FooterDashboard from "../dashboard/footer";

const DriverLocation = () => {
    const params = useParams()
    const userId = useSelector((state) => state.user.userData.id)
    const loading = useSelector((state) => state.loader.isLoading)
    const [watchId, setWatchId] = useState(null);
    const [isTracking, setIsTracking] = useState(false);
    const [message, setMessage] = useState("");
    const [coords, setCoords] = useState(null);
    const [Data, setData] = useState({
        order_id: params.id,
        driver_id: userId
    })
    const [delivery_id, setDelivery_id] = useState(null);
    const [orderData, setOrderData] = useState({
        id: "",
        status: "",
        userId: "",
        order_code: ""
    })

    useEffect(() => {
        axiosInstance.post("addDelivery", Data)
            .then((res) => {
                setDelivery_id(res.data.id)
            })
        axiosInstance.get(`order/${params.id}`)
            .then((res) => {
                setOrderData({
                    ...orderData,
                    id: res.data[0].id,
                    status: res.data[0].status,
                    userId: res.data[0].user_id,
                    order_code: res.data[0].order_code
                });
            })
    }, [])

    async function sendPosition(deliveryId, coords) {
        try {
            const response = await axiosInstance.post(
                `delivery/${deliveryId}/update-location`,
                {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                }
            );
            console.log("Location was sent.", response.data);
            setMessage("Location was successfully sent.");
        } catch (err) {
            console.error("An error occurred while sending the location!", err);
            setMessage("An error occurred while sending the location!");
        }
    }

    function startTracking() {
        if (!navigator.geolocation) {
            setMessage("Browser does not support location tracking!");
            return;
        }

        setMessage("Your location is being tracked...");
        setIsTracking(true);

        axiosInstance.post("status", orderData)
            .then((res) => {
                // setMessage(res.data.message)
            })

        const id = navigator.geolocation.watchPosition(
            (pos) => {
                const newCoords = pos.coords;
                setCoords(newCoords);
                setMessage("Location was successfully identified.");
                sendPosition(delivery_id, newCoords);
            },
            (err) => {
                console.error(err);
                setMessage(`Error: ${err.code} - ${err.message}`);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 10000,
            }
        );

        setWatchId(id);
    }

    function stopTracking() {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
            setIsTracking(false);
            setMessage("Location tracking has been disabled.");
        }
    }

    useEffect(() => {
        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [watchId]);

    return (
        <>
            <div className="page-wrapper">
                <DashHeader></DashHeader>
                <main className="content driver-main body">
                    <section className="">
                        <h2>Live Tracking</h2>
                        <p className="track-paragraph">Click the button below to send your location.</p>

                        {!isTracking ? (
                            <button className="track-btn" onClick={startTracking}>Start</button>
                        ) : (
                            <button className="track-btn" onClick={stopTracking}>Stop</button>
                        )}

                        {message && <p className="track-paragraph">{message}</p>}

                        {coords && (
                            <div>
                                <h4 className="track-h4">Your Current Location:</h4>
                                <p className="track-paragraph">Latitude: {coords.latitude}</p>
                                <p className="track-paragraph">Longitude: {coords.longitude}</p>
                            </div>
                        )}
                    </section>
                </main>
                <FooterDashboard></FooterDashboard>
            </div>
        </>
    )
}

export default DriverLocation;