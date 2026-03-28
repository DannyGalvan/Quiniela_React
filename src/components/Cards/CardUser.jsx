import React from "react";

export const CardUser = ({ data, title, content }) => {
  const rows = data
    ? [
        { label: "Posición", value: data.pocicion },
        { label: "Nombre",   value: data.nombre },
        { label: "DPI",      value: `${data.dpi.substring(0, 5)}·····` },
        { label: "Punteo",   value: data.punteo, highlight: true },
      ]
    : [];

  return (
    <div className="bg-card p-3" style={{ minWidth: "260px", maxWidth: "320px" }}>
      <div className="match-date-badge mb-2">
        {title ?? "Datos Usuario"}
      </div>

      {content && (
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textAlign: "center" }}>
          {content}
        </p>
      )}

      {rows.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {rows.map(({ label, value, highlight }) => (
            <li
              key={label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 4px",
                borderBottom: "1px solid var(--border-subtle)",
                fontSize: "0.875rem",
              }}
            >
              <strong style={{ color: "var(--text-muted)", fontWeight: 600 }}>{label}</strong>
              <strong style={{
                color: highlight ? "var(--brand-red)" : "var(--text-primary)",
                fontWeight: highlight ? 800 : 600,
              }}>
                {value}
              </strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
