import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { apiPostFinales } from "../../api/apiPartidos";
import { Toast } from "../Swal/Toast";
import Moment from "react-moment";

const getImg = (nombre) => {
  if (!nombre) return null;
  try { return require.context("../../Banderas", true)(`./${nombre}`); }
  catch { return null; }
};

const deriveGanador = (g1, g2, huboPenales, p1, p2, idE1, idE2) => {
  if (g1 === "" || g1 === "--" || g2 === "" || g2 === "--") return "";
  const n1 = Number(g1), n2 = Number(g2);
  if (n1 > n2) return String(idE1);
  if (n2 > n1) return String(idE2);
  if (huboPenales && p1 !== "" && p1 != null && p2 !== "" && p2 != null) {
    const np1 = Number(p1), np2 = Number(p2);
    if (np1 > np2) return String(idE1);
    if (np2 > np1) return String(idE2);
  }
  return "";
};

export const CardFinal = ({ data, actualiza }) => {
  const { authState } = useContext(AuthContext);

  const yaIngreso  = data.golesEquipo1 !== "--";
  const partidoId  = data.idPartido ?? data.id;
  const img1       = getImg(data.imagenEquipo1);
  const img2       = getImg(data.imagenEquipo2);
  const now        = new Date();
  const disabled   = now > new Date(data.fechaPartido);

  // ── Resumen de lo guardado (se actualiza en tiempo real tras cada save) ─────
  const [saved, setSaved] = useState({
    ingresado:      yaIngreso,
    golesEquipo1:   data.golesEquipo1,
    golesEquipo2:   data.golesEquipo2,
    huboPenales:    data.prediceHuboPenales ?? false,
    penalesEquipo1: data.penalesEquipo1 ?? null,
    penalesEquipo2: data.penalesEquipo2 ?? null,
  });

  // ── Estado del formulario (independiente de useForm para evitar el reset) ───
  const [goles1, setGoles1]                   = useState(yaIngreso ? String(data.golesEquipo1) : "");
  const [goles2, setGoles2]                   = useState(yaIngreso ? String(data.golesEquipo2) : "");
  const [penales1, setPenales1]               = useState(data.penalesEquipo1 != null ? String(data.penalesEquipo1) : "");
  const [penales2, setPenales2]               = useState(data.penalesEquipo2 != null ? String(data.penalesEquipo2) : "");
  const [prediceHuboPenales, setPredice]      = useState(data.prediceHuboPenales ?? false);
  const [ganador, setGanador]                 = useState(() =>
    deriveGanador(
      yaIngreso ? String(data.golesEquipo1) : "",
      yaIngreso ? String(data.golesEquipo2) : "",
      data.prediceHuboPenales ?? false,
      data.penalesEquipo1, data.penalesEquipo2,
      data.idEquipo1, data.idEquipo2,
    )
  );
  const [submitting, setSubmitting] = useState(false);

  const esEmpate = goles1 !== "" && goles2 !== "" && Number(goles1) === Number(goles2);

  // ── Handlers goles ────────────────────────────────────────────────────────
  const handleGoles1 = (e) => {
    const v = Math.max(0, Number(e.target.value));
    setGoles1(String(v));
    recalcGanador(String(v), goles2, prediceHuboPenales, penales1, penales2);
    if (String(v) !== goles2 || Number(v) !== Number(goles2)) {
      // si deja de ser empate, quitar penales
      const n1 = v, n2 = Number(goles2);
      if (n1 !== n2) { setPredice(false); setPenales1(""); setPenales2(""); }
    }
  };

  const handleGoles2 = (e) => {
    const v = Math.max(0, Number(e.target.value));
    setGoles2(String(v));
    recalcGanador(goles1, String(v), prediceHuboPenales, penales1, penales2);
    const n1 = Number(goles1), n2 = v;
    if (n1 !== n2) { setPredice(false); setPenales1(""); setPenales2(""); }
  };

  const recalcGanador = (g1, g2, huboPenales, p1, p2) => {
    setGanador(deriveGanador(g1, g2, huboPenales, p1, p2, data.idEquipo1, data.idEquipo2));
  };

  // ── Handlers penales ──────────────────────────────────────────────────────
  const handlePenales1 = (e) => {
    const v = String(Math.max(0, Number(e.target.value)));
    setPenales1(v);
    recalcGanador(goles1, goles2, prediceHuboPenales, v, penales2);
  };

  const handlePenales2 = (e) => {
    const v = String(Math.max(0, Number(e.target.value)));
    setPenales2(v);
    recalcGanador(goles1, goles2, prediceHuboPenales, penales1, v);
  };

  // ── Toggle penales ────────────────────────────────────────────────────────
  const togglePenales = () => {
    const next = !prediceHuboPenales;
    setPredice(next);
    if (!next) { setPenales1(""); setPenales2(""); setGanador(""); }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      idPartido:          partidoId,
      idUsuario:          authState.user,
      golesEquipo1:       Number(goles1),
      golesEquipo2:       Number(goles2),
      prediceHuboPenales,
      penalesEquipo1:     prediceHuboPenales ? Number(penales1) : null,
      penalesEquipo2:     prediceHuboPenales ? Number(penales2) : null,
    };

    const result = await apiPostFinales(payload);

    if (result?.exito) {
      Toast.fire({ icon: "success", title: result.mensaje });
      // Actualizar resumen con los valores RECIÉN guardados
      setSaved({
        ingresado:      true,
        golesEquipo1:   goles1,
        golesEquipo2:   goles2,
        huboPenales:    prediceHuboPenales,
        penalesEquipo1: prediceHuboPenales ? Number(penales1) : null,
        penalesEquipo2: prediceHuboPenales ? Number(penales2) : null,
      });
      actualiza?.(partidoId, goles1, goles2);
    } else {
      Toast.fire({ icon: "error", title: result?.mensaje ?? "Error al guardar" });
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-card card-animate p-3">

        {/* ── Cabecera ───────────────────────────────────────────────────── */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <span className="match-date-badge">🏆 {data.grupoEquipo1}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>
            <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />
          </span>
        </div>

        {/* ── Resumen predicción guardada ────────────────────────────────── */}
        {saved.ingresado && (
          <div style={{
            background: "rgba(59,130,246,0.08)",
            border: "1.5px solid rgba(59,130,246,0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "0.6rem 0.9rem",
            marginBottom: "1rem",
          }}>
            <p style={{ fontSize: "0.7rem", color: "var(--brand-accent)", fontWeight: 700, marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              ✅ Predicción guardada
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {img1 && <img src={img1} alt={data.nombreEquipo1} style={{ width: 22, height: 16, objectFit: "cover", borderRadius: 2 }} />}
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{data.nombreEquipo1}</span>
              </div>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "0.1em" }}>
                {saved.golesEquipo1} — {saved.golesEquipo2}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)" }}>{data.nombreEquipo2}</span>
                {img2 && <img src={img2} alt={data.nombreEquipo2} style={{ width: 22, height: 16, objectFit: "cover", borderRadius: 2 }} />}
              </div>
            </div>
            {saved.huboPenales && saved.penalesEquipo1 != null && (
              <p style={{ textAlign: "center", marginTop: "0.35rem", marginBottom: 0, fontSize: "0.75rem", color: "var(--brand-gold)", fontWeight: 600 }}>
                🥅 Penales: {saved.penalesEquipo1} — {saved.penalesEquipo2}
              </p>
            )}
          </div>
        )}

        {/* ── Formulario (solo si el partido no ha iniciado) ─────────────── */}
        {!disabled && (
          <>
            <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "0.75rem" }}>
              {saved.ingresado ? "✏️ Modificar predicción" : "📝 Ingresar predicción"}
            </p>

            {/* Equipo 1 */}
            <div className="team-row">
              {img1 && <img src={img1} alt={data.nombreEquipo1} />}
              <span className="team-name">{data.nombreEquipo1}</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span className="score-label">Goles</span>
                <input className="input-gol" type="number" min="0"
                  value={goles1} onChange={handleGoles1} required />
              </div>
            </div>

            <div className="vs-divider">vs</div>

            {/* Equipo 2 */}
            <div className="team-row">
              {img2 && <img src={img2} alt={data.nombreEquipo2} />}
              <span className="team-name">{data.nombreEquipo2}</span>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span className="score-label">Goles</span>
                <input className="input-gol" type="number" min="0"
                  value={goles2} onChange={handleGoles2} required />
              </div>
            </div>

            {/* ¿Quién gana? */}
            <div className="wc-field mt-3">
              <label className="wc-field__label">
                ¿Quién gana?
                {ganador && esEmpate && prediceHuboPenales
                  ? <span style={{ color: "var(--brand-gold)", marginLeft: 6, fontWeight: 600 }}>— Por penales</span>
                  : ganador
                    ? <span style={{ color: "var(--brand-green)", marginLeft: 6, fontWeight: 600 }}>— Por marcador</span>
                    : null}
              </label>
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                {[
                  { id: data.idEquipo1, nombre: data.nombreEquipo1, img: img1 },
                  { id: data.idEquipo2, nombre: data.nombreEquipo2, img: img2 },
                ].map((eq) => {
                  const selected = String(ganador) === String(eq.id);
                  return (
                    <div key={eq.id} style={{
                      flex: 1, padding: "0.5rem", borderRadius: "var(--radius-sm)",
                      border: selected ? "2px solid var(--brand-accent)" : "1.5px solid var(--border-color)",
                      background: selected ? "rgba(59,130,246,0.12)" : "var(--bg-surface)",
                      color: "var(--text-primary)", fontWeight: selected ? 700 : 500,
                      fontSize: "0.78rem", userSelect: "none",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    }}>
                      {eq.img && <img src={eq.img} alt={eq.nombre} style={{ width: 20, height: 14, objectFit: "cover", borderRadius: 2 }} />}
                      {eq.nombre}{selected && " ✓"}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Toggle penales */}
            <div className="mt-3">
              <button type="button" disabled={!esEmpate} onClick={togglePenales}
                style={{
                  width: "100%", padding: "0.5rem", borderRadius: "var(--radius-sm)",
                  cursor: esEmpate ? "pointer" : "not-allowed",
                  opacity: esEmpate ? 1 : 0.4,
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
                    <input className="input-gol" type="number" min="0" max="99"
                      value={penales1} onChange={handlePenales1} required={prediceHuboPenales} />
                  </div>
                  <span style={{ color: "var(--text-muted)", fontWeight: 700, fontSize: "1rem" }}>—</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span className="score-label">{data.nombreEquipo2}</span>
                    <input className="input-gol" type="number" min="0" max="99"
                      value={penales2} onChange={handlePenales2} required={prediceHuboPenales} />
                  </div>
                </div>
              )}

              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center", marginTop: 8, marginBottom: 0 }}>
                Resultado exacto: <strong>3 pts</strong> · Solo ganador: <strong>1 pt</strong> · Acertar penales: <strong>+1 pt</strong> · Acertar marcador penales: <strong>+2 pts</strong>
              </p>
            </div>

            <div className="mt-3">
              <button className="btn-wc-primary" type="submit" disabled={submitting}>
                {submitting ? "Guardando..." : saved.ingresado ? "✏️ Modificar Predicción" : "💾 Guardar Predicción"}
              </button>
            </div>
          </>
        )}

        {/* ── Partido ya iniciado sin predicción ────────────────────────── */}
        {disabled && !saved.ingresado && (
          <div style={{ textAlign: "center", padding: "0.75rem 0", color: "var(--text-muted)", fontSize: "0.82rem" }}>
            No ingresaste predicción para este partido
          </div>
        )}

      </div>
    </form>
  );
};
