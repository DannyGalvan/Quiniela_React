import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVERPATH } from "../config/configuracion";

const rules = [
  {
    icon: "📅",
    text: (
      <>
        Debes ingresar los resultados del partido <strong>mínimo un día antes</strong> del juego.
      </>
    ),
  },
  {
    icon: "✏️",
    text: (
      <>
        Ingresa tus resultados en{" "}
        <Link to={`${SERVERPATH}/post-group`}>Por Grupos</Link> o{" "}
        <Link to={`${SERVERPATH}/matches`}>Todos los Partidos</Link>.
      </>
    ),
  },
  {
    icon: "💾",
    text: "Llena las casillas y haz click en 'Guardar Datos' o 'Actualizar Datos' según corresponda.",
  },
  {
    icon: "👁️",
    text: (
      <>
        Visualiza tus resultados en{" "}
        <Link to={`${SERVERPATH}/my-info`}>Mis Resultados Por Grupo</Link> y{" "}
        <Link to={`${SERVERPATH}/my-result`}>Todos mis resultados</Link>.
      </>
    ),
  },
  {
    icon: "📊",
    text: (
      <>
        Consulta tu ponderación en{" "}
        <Link to={`${SERVERPATH}/comparation-group`}>Comparación Grupos</Link> y{" "}
        <Link to={`${SERVERPATH}/comparation`}>Comparación Todos</Link>.
      </>
    ),
  },
  {
    icon: "🔄",
    text: "Puedes modificar tus resultados cuantas veces quieras mientras no llegue la fecha del partido.",
  },
  {
    icon: "🔒",
    text: "Una vez llegada la fecha del juego no podrás modificar ni ingresar resultados.",
  },
  {
    icon: "🏆",
    text: (
      <>
        La tabla de clasificaciones está en{" "}
        <Link to={`${SERVERPATH}/table-result`}>Tabla de Clasificaciones</Link>.
        Gana quien acumule más puntos al final.
      </>
    ),
  },
];

const scoring = [
  { pts: 3, color: "var(--brand-green)",  label: "Aciertas ganador Y resultado exacto" },
  { pts: 1, color: "var(--brand-gold)",   label: "Aciertas solo el ganador del encuentro" },
  { pts: 0, color: "var(--brand-red)",    label: "No aciertas ninguno de los anteriores" },
];

const Instructions = () => {
  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>
          Cómo <span className="gradient-text">Jugar</span>
        </h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>

      <Container className="py-4" style={{ maxWidth: 860 }}>
        {/* Reglas */}
        <div className="instruction-card mb-4">
          <h5>📋 Reglas del Juego</h5>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {rules.map((rule, i) => (
              <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 1 }}>{rule.icon}</span>
                <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {rule.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Punteos */}
        <div className="instruction-card">
          <h5>🎯 Sistema de Punteos</h5>
          <Row className="g-3 mt-1">
            {scoring.map(({ pts, color, label }) => (
              <Col key={pts} xs={12} md={4}>
                <div style={{
                  background: "var(--bg-surface)",
                  border: `2px solid ${color}`,
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  textAlign: "center",
                  transition: "var(--transition)",
                }}>
                  <div style={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color,
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}>
                    {pts} {pts === 3 ? "🏅" : pts === 1 ? "✅" : "❌"}
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>
                    {label}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Instructions;
