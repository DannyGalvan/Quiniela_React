import React from "react";

export const MesajeNoData = ({ mesaje }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        gap: "0.75rem",
      }}
    >
      <span style={{ fontSize: "2.5rem" }}>🔍</span>
      <p
        style={{
          color: "var(--text-muted)",
          fontWeight: 600,
          fontSize: "0.95rem",
          textAlign: "center",
          margin: 0,
        }}
      >
        {mesaje}
      </p>
    </div>
  );
};
