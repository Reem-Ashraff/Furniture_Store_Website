// src/echo.js
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export default function createEcho() {
  const echo = new Echo({
    broadcaster: "pusher",
    key: "local", // لو في .env اكتبها فيه
    wsHost: "127.0.0.1",
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ["ws", "wss"], // WebSockets فقط
  });

  return echo;
}
