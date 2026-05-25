import React, { useEffect, useState } from "react";
import "./notifications.css";
import axiosInstance from "../../axios config/axiosinstance";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { notifications } from "../../store/actions/notifications";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
    const loading = useSelector((state) => state.loader.isLoading)
    const user_notifications = useSelector((state) => state.notifications.notifications)

    return (
        <>
            <main className="content body">
                {loading && <div className="d-flex justify-content-center overlay">
                    <div className="spinner-grow loader" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
                <section className="notification-main">
                    <h2>Notifications</h2>
                    <div className="">
                        {user_notifications.map((notification) => {
                            const notification_date = new Date(notification.created_at) //notification.created_at.slice(0, 10)
                            const duration = formatDistanceToNow(notification_date, { addSuffix: false })
                            return (
                                <div className="d-flex justify-content-between align-items-center notification" key={notification.id}>
                                    <div key={notification.id}>
                                        <h3>{notification.title}</h3>
                                        <p>{notification.message}</p>
                                    </div>
                                    <div className="duration">{duration}</div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}

export default Notifications;