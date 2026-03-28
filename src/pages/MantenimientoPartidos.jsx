import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { apiEquipos, apiNuevoPartido, apiPartidos } from "../api/apiPartidos";
import { Toast } from "../components/Swal/Toast";
import Loading from "./Loading/Loading";
import Moment from "react-moment";

const initialForm = { idEquipo1: "", idEquipo2: "", fechaPartido: "" };

const MantenimientoPartidos = () => {
  const [equipos, setEquipos]   = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [form, setForm]         = useState(initialForm);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [refresh, setRefresh]   = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [resEq, resPart] = await Promise.all([apiEquipos(), apiPartidos()]);
      if (resEq?.data)   setEquipos(resEq.data);
      if (resPart?.data) setPartidos(resPart.data);
      setLoading(false);
    })();
  }, [refresh]);

  const validate = (f) => {
    const e = {};
    if (!f.idEquipo1)     e.idEquipo1 = "Selecciona el equipo 1";
    if (!f.idEquipo2)     e.idEquipo2 = "Selecciona el equipo 2";
    if (f.idEquipo1 && f.idEquipo2 && f.idEquipo1 === f.idEquipo2)
      e.idEquipo2 = "Los equipos no pueden ser el mismo";
    if (!f.fechaPartido)  e.fechaPartido = "Selecciona la fecha del partido";
    return e;
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSaving(true);
    const res = await apiNuevoPartido({
      idEquipo1: Number(form.idEquipo1),
      idEquipo2: Number(form.idEquipo2),
      fechaPartido: form.fechaPartido,
    });
    setSaving(false);

    if (res?.exito > 0) {
      Toast.fire({ icon: "success", title: "Partido creado con éxito" });
      setForm(initialForm);
      setRefresh((v) => !v);
    } else {
      Toast.fire({ icon: "error", title: res?.mensaje ?? "Error al crear el partido" });
    }
  };

  // Agrupar equipos por grupo para el select
  const grupos = equipos.reduce((acc, eq) => {
    const g = eq.grupo ?? "?";
    if (!acc[g]) acc[g] = [];
    acc[g].push(eq);
    return acc;
  }, {});

  if (loading) return <Loading />;

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Mantenimiento de <span className="gradient-text">Partidos</span></h1>
        <p>Agrega los partidos de la fase de grupos</p>
      </div>

      <Container className="py-4" style={{ maxWidth: 900 }}>
        {/* Formulario */}
        <div className="bg-card p-4 mb-4">
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--brand-accent)", marginBottom: "1.25rem" }}>
            ⚽ Nuevo Partido
          </p>

          <form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12} md={4}>
                <div className="wc-field">
                  <label className="wc-field__label" htmlFor="idEquipo1">Equipo 1</label>
                  <select
                    id="idEquipo1"
                    name="idEquipo1"
                    className={`wc-field__input${errors.idEquipo1 ? " wc-field__input--invalid" : ""}`}
                    value={form.idEquipo1}
                    onChange={handleChange}
                    style={{ height: 50 }}
                  >
                    <option value="">Selecciona...</option>
                    {Object.entries(grupos).sort().map(([grupo, eqs]) => (
                      <optgroup key={grupo} label={`Grupo ${grupo}`}>
                        {eqs.map((eq) => (
                          <option key={eq.id} value={eq.id}>{eq.nombre}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.idEquipo1 && <span className="wc-field__error">{errors.idEquipo1}</span>}
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="wc-field">
                  <label className="wc-field__label" htmlFor="idEquipo2">Equipo 2</label>
                  <select
                    id="idEquipo2"
                    name="idEquipo2"
                    className={`wc-field__input${errors.idEquipo2 ? " wc-field__input--invalid" : ""}`}
                    value={form.idEquipo2}
                    onChange={handleChange}
                    style={{ height: 50 }}
                  >
                    <option value="">Selecciona...</option>
                    {Object.entries(grupos).sort().map(([grupo, eqs]) => (
                      <optgroup key={grupo} label={`Grupo ${grupo}`}>
                        {eqs.map((eq) => (
                          <option key={eq.id} value={eq.id}>{eq.nombre}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.idEquipo2 && <span className="wc-field__error">{errors.idEquipo2}</span>}
                </div>
              </Col>

              <Col xs={12} md={4}>
                <div className="wc-field">
                  <label className="wc-field__label" htmlFor="fechaPartido">Fecha del Partido</label>
                  <input
                    id="fechaPartido"
                    name="fechaPartido"
                    type="date"
                    className={`wc-field__input${errors.fechaPartido ? " wc-field__input--invalid" : ""}`}
                    value={form.fechaPartido}
                    onChange={handleChange}
                  />
                  {errors.fechaPartido && <span className="wc-field__error">{errors.fechaPartido}</span>}
                </div>
              </Col>
            </Row>

            <div className="mt-4">
              <button
                className="btn-wc-primary"
                type="submit"
                disabled={saving}
                style={{ maxWidth: 220 }}
              >
                {saving ? "Guardando..." : "➕ Agregar Partido"}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de partidos existentes */}
        <div className="bg-card p-4">
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
            📋 Partidos Registrados ({partidos.length})
          </p>

          {partidos.length === 0 ? (
            <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem 0" }}>
              No hay partidos registrados aún
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {partidos.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-sm)",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <span className="match-date-badge" style={{ marginBottom: 0 }}>
                    Grupo {p.grupoEquipo1}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", flex: 1, textAlign: "center" }}>
                    {p.nombreEquipo1} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>vs</span> {p.nombreEquipo2}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600, whiteSpace: "nowrap" }}>
                    <Moment date={new Date(p.fechaPartido)} format="DD/MM/YYYY" />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MantenimientoPartidos;
