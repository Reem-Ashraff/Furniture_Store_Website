import React, { useEffect, useState } from "react";
import "./sales.css";

const CountDown = ({ endDate }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endDate) - new Date();
        let timeLeft = {}
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        }
        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return (
        <div className="countdown">
            {timeLeft.days !== undefined ? (
                <span>
                    {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m left for the sale
                </span>
            ) : (
                <span className="expired">The Sale Ended</span>
            )}
        </div>
    )
}

export default CountDown;