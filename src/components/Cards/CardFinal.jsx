import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { apiPostFinales } from "../../api/apiPartidos";
import { Toast } from "../Swal/Toast";
import Moment from "react-moment";

const getImg = (nombre) => {
  if (!nombre) return null;
  try { return require.context("../../Banderas", true)(`./${nombre}`); }
  catch { return null; }
};

const initialForm = {
  idPartido: "", idUsuario: "",
  golesEquipo1: "", golesEquipo2: "",
  ganador: "",
  prediceHuboPenales: false,
  penalesEquipo1: "", penalesEquipo2: "",
};

const validate = (form) => {
  if (form.golesEquipo1 < 0) form.golesEquipo1 = 0;
  if (form.golesEquipo2 < 0) form.golesEquipo2 = 0;
  if (form.penalesEquipo1 < 0) form.penalesEquipo1 = 0;
  if (form.penalesEquipo2 < 0) form.penalesEquipo2 = 0;
  return {};
};

export const CardFinal = ({ data, actualiza }) => {
  const { authState } = useContext(AuthContext);
  initialForm.idUsuario = authState.user;

  const [prediceHuboPenales, setPrediceHuboPenales] = useState(
    data.prediceHuboPenales ?? false
  );

  const enviarDatos = async (form) => {
    const payload = {
      idPartido:          form.idPartido,
      idUsuario:          form.idUsuario,
      golesEquipo1:       Number(form.golesEquipo1),
      golesEquipo2:       Number(form.golesEquipo2),
      ganador:            Number(form.ganador) || 0,
      prediceHuboPenales,
      penalesEquipo1:     prediceHuboPenales ? Number(form.penalesEquipo1) : null,
      penalesEquipo2:     prediceHuboPenales ? Number(form.penalesEquipo2) : null,
    };

    const result = await apiPostFinales(payload);
    if (result?.exito) {
      Toast.fire({ icon: "success", title: result.mensaje });
      actualiza?.(form.idPartido, form.golesEquipo1, form.golesEquipo2);
    } else {
      Toast.fire({ icon: "error", title: result?.mensaje ?? "Error al guardar" });
    }
  };

  const { form, handleChange, handleSubmit } = useForm(initialForm, validate, enviarDatos);

  const now      = new Date();
  const match    = new Date(data.fechaPartido);
  const disabled = now > match;

  const partidoId = data.idPartido ?? data.id;
  const img1 = getImg(data.imagenEquipo1);
  const img2 = getImg(data.imagenEquipo2);

  // Auto-detecta ganador al cambiar goles
  const handleGolesChange = (e) => {
    handleChange(e);
    const g1 = e.target.name === "golesEquipo1" ? Number(e.target.value) : Number(form.golesEquipo1);
    const g2 = e.target.name === "golesEquipo2" ? Number(e.target.value) : Number(form.golesEquipo2);
    if (!isNaN(g1) && !isNaN(g2)) {
      if (g1 > g2)      form.ganador = String(data.idEquipo1);
      else if (g2 > g1) form.ganador = String(data.idEquipo2);
      else              form.ganador = "";
    }
  };

  const yaIngreso = data.golesEquipo1 !== "--";

  return (
    <Form onSubmit={handleSubmit}>
      <div className="bg-card card-animate p-3">
        {/* Cabecera */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="match-date-badge">🏆 {data.grupoEquipo1}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />
          </span>
        </div>

        <input name="idPartido" value={(form.idPartido = partidoId)} type="hidden" required />

        {/* Equipo 1 */}
        <div className="team-row">
          {img1 && <img src={img1} alt={data.nombreEquipo1} />}
          <span className="team-name">{data.nombreEquipo1}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span className="score-label">Goles</span>
            <input className="input-gol" name="golesEquipo1" value={form.golesEquipo1}
              placeholder={data.golesEquipo1} onChange={handleGolesChange}
              type="number" disabled={disabled} required />
          </div>
        </div>

        <div className="vs-divider">vs</div>

        {/* Equipo 2 */}
        <div className="team-row">
          {img2 && <img src={img2} alt={data.nombreEquipo2} />}
          <span className="team-name">{data.nombreEquipo2}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span className="score-label">Goles</span>
            <input className="input-gol" name="golesEquipo2" value={form.golesEquipo2}
              placeholder={data.golesEquipo2} onChange={handleGolesChange}
              type="number" disabled={disabled} required />
          </div>
        </div>

        {/* Ganador */}
        {!disabled && (
          <div className="wc-field mt-3">
            <label className="wc-field__label">¿Quién gana?</label>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {[{ id: data.idEquipo1, nombre: data.nombreEquipo1, img: img1 },
                { id: data.idEquipo2, nombre: data.nombreEquipo2, img: img2 }].map((eq) => (
                <button key={eq.id} type="button"
                  onClick={() => { form.ganador = String(eq.id); handleChange({ target: { name: "ganador", value: String(eq.id) } }); }}
                  style={{
                    flex: 1, padding: "0.5rem 0.5rem", borderRadius: "var(--radius-sm)",
                    border: String(form.ganador) === String(eq.id) ? "2px solid var(--brand-accent)" : "1.5px solid var(--border-color)",
                    background: String(form.ganador) === String(eq.id) ? "rgba(59,130,246,0.12)" : "var(--bg-surface)",
                    color: "var(--text-primary)", fontWeight: String(form.ganador) === String(eq.id) ? 700 : 500,
                    fontSize: "0.78rem", cursor: "pointer", transition: "var(--transition)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}>
                  {eq.img && <img src={eq.img} alt={eq.nombre} style={{ width: 20, height: 14, objectFit: "cover", borderRadius: 2 }} />}
                  {eq.nombre}{String(form.ganador) === String(eq.id) && " ✓"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toggle penales */}
        {!disabled && (
          <div className="mt-3">
            <button type="button"
              onClick={() => { setPrediceHuboPenales((v) => !v); form.penalesEquipo1 = ""; form.penalesEquipo2 = ""; }}
              style={{
                width: "100%", padding: "0.5rem", borderRadius: "var(--radius-sm)", cursor: "pointer",
                border: prediceHuboPenales ? "2px solid var(--brand-gold)" : "1.5px solid var(--border-color)",
                background: prediceHuboPenales ? "rgba(245,158,11,0.10)" : "var(--bg-surface)",
                color: prediceHuboPenales ? "var(--brand-gold)" : "var(--text-muted)",
                fontWeight: prediceHuboPenales ? 700 : 500, fontSize: "0.8rem", transition: "var(--transition)",
              }}>
              🥅 {prediceHuboPenales ? "Predigo que habrá penales ✓" : "¿Predices penales? (+1 o +2 pts extra)"}
            </button>

            {prediceHuboPenales && (
              <div style={{ display: "flex", gap: 12, marginTop: 10, alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span className="score-label">{data.nombreEquipo1}</span>
                  <input className="input-gol" name="penalesEquipo1" value={form.penalesEquipo1}
                    onChange={handleChange} type="number" min="0" max="99" required={prediceHuboPenales} />
                </div>
                <span style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "1rem" }}>—</span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span className="score-label">{data.nombreEquipo2}</span>
                  <input className="input-gol" name="penalesEquipo2" value={form.penalesEquipo2}
                    onChange={handleChange} type="number" min="0" max="99" required={prediceHuboPenales} />
                </div>
              </div>
            )}

            {/* Info de punteos */}
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center", marginTop: 8, marginBottom: 0 }}>
              Resultado exacto: <strong>3 pts</strong> · Solo ganador: <strong>1 pt</strong> · Acertar penales: <strong>+1 pt</strong> · Acertar marcador penales: <strong>+2 pts</strong>
            </p>
          </div>
        )}

        <div className="mt-3">
          <button className="btn-wc-primary" type="submit" disabled={disabled}>
            {yaIngreso ? "✏ Modificar Predicción" : "💾 Guardar Predicción"}
          </button>
        </div>
      </div>
    </Form>
  );
};
