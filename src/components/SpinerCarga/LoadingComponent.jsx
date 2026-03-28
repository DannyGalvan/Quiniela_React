import React from "react";

export const LoadingComponent = () => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "2rem",
    }}>
      {[0, 0.2, 0.4, 0.6, 0.8].map((delay, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: i % 3 === 0
              ? "var(--brand-accent)"
              : i % 3 === 1
              ? "var(--brand-red)"
              : "var(--brand-gold)",
            animation: `pulseDot 1.4s ease-in-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
