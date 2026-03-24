import React from "react";
import Moment from "react-moment";

const logoImage = require.context("../../Banderas", true);

export const CardPartidos = ({ data }) => {
  return (
    <div className="bg-card card-animate p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="match-date-badge">
          ⚽ Grupo {data.grupoEquipo1}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />
        </span>
      </div>

      <div className="team-row">
        <img src={logoImage(`./${data.imagenEquipo1}`)} alt={data.nombreEquipo1} />
        <span className="team-name">{data.nombreEquipo1}</span>
        <span className="team-score">{data.golesEquipo1}</span>
      </div>

      <div className="vs-divider">vs</div>

      <div className="team-row">
        <img src={logoImage(`./${data.imagenEquipo2}`)} alt={data.nombreEquipo2} />
        <span className="team-name">{data.nombreEquipo2}</span>
        <span className="team-score">{data.golesEquipo2}</span>
      </div>
    </div>
  );
};
