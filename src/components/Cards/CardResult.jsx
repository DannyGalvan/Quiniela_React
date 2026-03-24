import React from "react";
import { Form } from "react-bootstrap";
import Moment from "react-moment";
import { useForm } from "../../hooks/useForm";
import { Toast } from "../Swal/Toast";
import { apiPutPartidos } from "../../api/apiPartidos";

const logoImage = require.context("../../Banderas", true);

const initialForm = {
  idPartido: "",
  golesEquipo1: "",
  golesEquipo2: "",
};

export const CardResult = ({ data, func, isAdmin }) => {
  const enviarDatos = async (form) => {
    const response = await apiPutPartidos(form);
    if (response.mensaje) {
      Toast.fire({ icon: "success", title: `${response.mensaje}` });
      func(prev => !prev);
    }
  };

  const { form, handleChange, handleSubmit } = useForm(initialForm, null, enviarDatos);

  const now = new Date();
  const match = new Date(data.fechaPartido);
  const disabled = now > match;

  return (
    <Form onSubmit={handleSubmit}>
      <div className="bg-card card-animate p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="match-date-badge">⚽ Grupo {data.grupoEquipo1}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />
          </span>
        </div>

        <input
          name="idPartido"
          value={(form.idPartido = data.id)}
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
              name="golesEquipo1"
              value={form.golesEquipo1}
              onChange={handleChange}
              type="number"
              disabled={isAdmin ?? disabled}
              required
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
              name="golesEquipo2"
              value={form.golesEquipo2}
              onChange={handleChange}
              type="number"
              disabled={isAdmin ?? disabled}
              required
            />
          </div>
        </div>

        <div className="mt-3">
          <button className="btn-wc-primary" type="submit" disabled={isAdmin ?? disabled}>
            💾 Guardar Datos
          </button>
        </div>
      </div>
    </Form>
  );
};
