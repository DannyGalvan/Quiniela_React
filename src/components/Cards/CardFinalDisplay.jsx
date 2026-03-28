import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import { createImageLoader } from "../../utils/imageLoader";

const logoImage = createImageLoader("../../Banderas");

const getImg = (nombre) => {
  if (!nombre) return null;
  try { return logoImage(`./${nombre}`); }
  catch { return null; }
};

export const CardFinalDisplay = ({ data }) => {
  const img1 = getImg(data.imagenEquipo1);
  const img2 = getImg(data.imagenEquipo2);

  return (
    <div className="bg-card card-animate p-3">

      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="match-date-badge">🏆 {data.grupoEquipo1}</span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          {formatDate(new Date(data.fechaPartido), "DD/MM/YYYY")}
        </span>
      </div>

      <div className="team-row">
        {img1 && <img src={img1} alt={data.nombreEquipo1} />}
        <span className="team-name">{data.nombreEquipo1}</span>
        <span className="team-score">{data.golesEquipo1 ?? "--"}</span>
      </div>

      <div className="vs-divider">vs</div>

      <div className="team-row">
        {img2 && <img src={img2} alt={data.nombreEquipo2} />}
        <span className="team-name">{data.nombreEquipo2}</span>
        <span className="team-score">{data.golesEquipo2 ?? "--"}</span>
      </div>

      {data.huboPenales && (
        <div style={{
          textAlign: "center", marginTop: 8,
          fontSize: "0.78rem", color: "var(--brand-gold)", fontWeight: 600,
        }}>
          🥅 Penales: {data.penalesEquipo1} – {data.penalesEquipo2}
        </div>
      )}

    </div>
  );
};
