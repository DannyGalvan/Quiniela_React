import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { AuthContext } from "../../context/authContext";
import { useChat } from "../../hooks/useChat";

const MAX_LEN = 300;

const formatTime = (ts) => {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const ChatWidget = () => {
  const { authState } = useContext(AuthContext);
  const [open, setOpen]       = useState(false);
  const [input, setInput]     = useState("");
  const [unread, setUnread]   = useState(0);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  const { messages, connected, userEvents, sendMessage } = useChat(
    authState.isLoggedIn ? authState.sesion : null
  );

  // Scroll al último mensaje cuando el chat está abierto
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setUnread(0);
    }
  }, [messages, open]);

  // Contador de no leídos cuando está cerrado
  useEffect(() => {
    if (!open && messages.length > 0) {
      setUnread((prev) => prev + 1);
    }
  }, [messages]);

  // Notificación de usuario conectado/desconectado (auto-clear)
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    if (!userEvents) return;
    const text =
      userEvents.type === "joined"
        ? `${userEvents.name} se unió al chat ⚽`
        : `${userEvents.name} salió del chat`;
    setNotice(text);
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [userEvents]);

  const handleOpen = () => {
    setOpen((v) => !v);
    setUnread(0);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const handleSend = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!input.trim()) return;
      await sendMessage(input);
      setInput("");
      inputRef.current?.focus();
    },
    [input, sendMessage]
  );

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!authState.isLoggedIn) return null;

  const myId = String(authState.user);

  return (
    <div className="chat-widget">
      {/* Burbuja flotante */}
      <button
        className={`chat-fab ${open ? "chat-fab--open" : ""}`}
        onClick={handleOpen}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <span style={{ fontSize: "1.2rem" }}>✕</span>
        ) : (
          <>
            <span style={{ fontSize: "1.4rem" }}>💬</span>
            {unread > 0 && (
              <span className="chat-fab__badge">{unread > 9 ? "9+" : unread}</span>
            )}
          </>
        )}
      </button>

      {/* Panel del chat */}
      <div className={`chat-panel ${open ? "chat-panel--open" : ""}`} role="dialog" aria-label="Chat en vivo">
        {/* Header */}
        <div className="chat-panel__header">
          <div className="chat-panel__header-info">
            <span style={{ fontSize: "1.1rem" }}>⚽</span>
            <div>
              <p className="chat-panel__title">Chat en Vivo</p>
              <p className="chat-panel__subtitle">Mundial 2026</p>
            </div>
          </div>
          <div className={`chat-status ${connected ? "chat-status--on" : "chat-status--off"}`}>
            <span className="chat-status__dot" />
            {connected ? "En línea" : "Reconectando..."}
          </div>
        </div>

        {/* Aviso de usuario */}
        {notice && (
          <div className="chat-notice">{notice}</div>
        )}

        {/* Mensajes */}
        <div className="chat-panel__body">
          {messages.length === 0 && (
            <div className="chat-empty">
              <span style={{ fontSize: "2rem" }}>⚽</span>
              <p>Sé el primero en escribir algo</p>
            </div>
          )}
          {messages.map((msg) => {
            const isMe = String(msg.userId) === myId;
            return (
              <div
                key={msg.id}
                className={`chat-msg ${isMe ? "chat-msg--me" : "chat-msg--other"}`}
              >
                {!isMe && (
                  <p className="chat-msg__author">{msg.userName}</p>
                )}
                <div className="chat-msg__bubble">
                  <span className="chat-msg__text">{msg.message}</span>
                  <span className="chat-msg__time">{formatTime(msg.timestamp)}</span>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form className="chat-panel__footer" onSubmit={handleSend}>
          <input
            ref={inputRef}
            className="chat-input"
            type="text"
            placeholder="Escribe un mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
            onKeyDown={handleKey}
            disabled={!connected}
            maxLength={MAX_LEN}
            autoComplete="off"
          />
          <button
            className="chat-send-btn"
            type="submit"
            disabled={!connected || !input.trim()}
            aria-label="Enviar mensaje"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
};
