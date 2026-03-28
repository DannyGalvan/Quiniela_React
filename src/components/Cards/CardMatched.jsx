import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { apiPostPartidos } from "../../api/apiPartidos";
import { Toast } from "../Swal/Toast";
import Moment from "react-moment";

const logoImage = require.context("../../Banderas", true);

const getImg = (nombre) => {
  if (!nombre) return null;
  try { return logoImage(`./${nombre}`); }
  catch { return null; }
};

const initialForm = {
  idPartido: "",
  idUsuario: "",
  golesEquipo1: "",
  golesEquipo2: "",
};

const validate = (form) => {
  if (form.golesEquipo1 < 0) form.golesEquipo1 = 0;
  if (form.golesEquipo2 < 0) form.golesEquipo2 = 0;
  return {};
};

export const CardMatched = ({ data, actualiza }) => {
  const { authState } = useContext(AuthContext);
  initialForm.idUsuario = authState.user;

  const enviarDatos = async (form) => {
    const result = await apiPostPartidos(form);
    if (result.exito) {
      Toast.fire({ icon: "success", title: `${result.mensaje}` });
      actualiza(form.idPartido, form.golesEquipo1, form.golesEquipo2);
    } else {
      Toast.fire({ icon: "error", title: `${result.mensaje}` });
    }
  };

  const { form, handleChange, handleSubmit } = useForm(initialForm, validate, enviarDatos);

  const now   = new Date();
  const match = new Date(data.fechaPartido);
  const disabled = now > match;

  // El endpoint /Todos devuelve idPartido; el endpoint /Partidos devuelve id
  const partidoId = data.idPartido ?? data.id;

  const img1 = getImg(data.imagenEquipo1);
  const img2 = getImg(data.imagenEquipo2);

  return (
    <Form onSubmit={handleSubmit}>
      <div className="bg-card card-animate p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="match-date-badge">⚽ Grupo {data.grupoEquipo1}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />
          </span>
        </div>

        <input
          name="idPartido"
          value={(form.idPartido = partidoId)}
          type="hidden"
          required
        />

        <div className="team-row">
          {img1 && <img src={img1} alt={data.nombreEquipo1} />}
          <span className="team-name">{data.nombreEquipo1}</span>
          <div className="d-flex flex-column align-items-center">
            <span className="score-label">Goles</span>
            <input
              className="input-gol"
              name="golesEquipo1"
              value={form.golesEquipo1}
              placeholder={data.golesEquipo1}
              onChange={handleChange}
              type="number"
              disabled={disabled}
              required
            />
          </div>
        </div>

        <div className="vs-divider">vs</div>

        <div className="team-row">
          {img2 && <img src={img2} alt={data.nombreEquipo2} />}
          <span className="team-name">{data.nombreEquipo2}</span>
          <div className="d-flex flex-column align-items-center">
            <span className="score-label">Goles</span>
            <input
              className="input-gol"
              name="golesEquipo2"
              value={form.golesEquipo2}
              placeholder={data.golesEquipo2}
              onChange={handleChange}
              type="number"
              disabled={disabled}
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <button className="btn-wc-primary" type="submit" disabled={disabled}>
            {data.golesEquipo1 !== "--" ? "✏ Modificar Datos" : "💾 Guardar Datos"}
          </button>
        </div>
      </div>
    </Form>
  );
};
