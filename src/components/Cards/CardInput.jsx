import React from "react";
import Moment from "react-moment";

const logoImage = require.context("../../Banderas", true);

export const CardInput = ({ data, id, form, handleChange }) => {
  const now = new Date();
  const match = new Date(data.fechaPartido);
  const disabled = now > match;

  return (
    <div className="bg-card card-animate p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="match-date-badge">
          ⚽ Grupo {data.grupoEquipo1}
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
          <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />
        </span>
      </div>

      <input
        name={`IdPartido${id}`}
        value={(form[`IdPartido${id}`] = data.id)}
        type="hidden"
        required
      />

      <div className="team-row">
        <img src={logoImage(`./${data.imagenEquipo1}`)} alt={data.nombreEquipo1} />
        <span className="team-name">{data.nombreEquipo1}</span>
        <div className="d-flex flex-column align-items-center">
          <span className="score-label">Goles</span>
          <input
            className="input-gol"
            name={`GolesP${id}`}
            value={form[`GolesP${id}`]}
            onChange={handleChange}
            type="number"
            required
            disabled={disabled}
          />
        </div>
      </div>

      <div className="vs-divider">vs</div>

      <div className="team-row">
        <img src={logoImage(`./${data.imagenEquipo2}`)} alt={data.nombreEquipo2} />
        <span className="team-name">{data.nombreEquipo2}</span>
        <div className="d-flex flex-column align-items-center">
          <span className="score-label">Goles</span>
          <input
            className="input-gol"
            name={`GolesS${id}`}
            value={form[`GolesS${id}`]}
            onChange={handleChange}
            type="number"
            required
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};
