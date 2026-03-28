import { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";

const HUB_URL = `${import.meta.env.VITE_API_QUINIELA?.replace("/api", "") ?? ""}/hubs/chat`;

export const useChat = (token) => {
  const [messages, setMessages]     = useState([]);
  const [connected, setConnected]   = useState(false);
  const [userEvents, setUserEvents] = useState(null); // { type: "joined"|"left", name }
  const connectionRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => token,
        skipNegotiation: false,
        transport: signalR.HttpTransportType.WebSockets |
                   signalR.HttpTransportType.LongPolling,
        withCredentials: false,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    connection.on("ReceiveMessage", (payload) => {
      setMessages((prev) => [...prev.slice(-199), { ...payload, id: Date.now() + Math.random() }]);
    });

    connection.on("UserJoined", (name) => {
      setUserEvents({ type: "joined", name });
    });

    connection.on("UserLeft", (name) => {
      setUserEvents({ type: "left", name });
    });

    connection.onreconnecting(() => setConnected(false));
    connection.onreconnected(() => setConnected(true));
    connection.onclose(() => setConnected(false));

    connection.start()
      .then(() => setConnected(true))
      .catch((err) => console.warn("Chat SignalR error:", err));

    connectionRef.current = connection;

    return () => {
      connection.stop();
    };
  }, [token]);

  const sendMessage = useCallback(async (text) => {
    if (!connectionRef.current || connectionRef.current.state !== signalR.HubConnectionState.Connected)
      return;
    if (!text?.trim()) return;
    await connectionRef.current.invoke("SendMessage", text.trim());
  }, []);

  return { messages, connected, userEvents, sendMessage };
};
