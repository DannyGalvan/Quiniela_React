import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { apiPartidos, apiPutPartidos, apiPostCalculo } from "../api/apiPartidos";
import { Toast } from "../components/Swal/Toast";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";
import Loading from "./Loading/Loading";
import { formatDate } from "../utils/dateFormatter";
import { createImageLoader } from "../utils/imageLoader";

const logoImage = createImageLoader("../Banderas");

const getImg = (nombre) => {
  if (!nombre) return null;
  try {
    return logoImage(`./${nombre}`);
  } catch { return null; }
};

// Agrupa partidos por grupo para el select
const agruparPorGrupo = (partidos) =>
  partidos.reduce((acc, p) => {
    const g = p.grupoEquipo1 ?? "?";
    if (!acc[g]) acc[g] = [];
    acc[g].push(p);
    return acc;
  }, {});

const Results = () => {
  const [partidos, setPartidos]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selectId, setSelectId]   = useState("");
  const [goles1, setGoles1]       = useState("");
  const [goles2, setGoles2]       = useState("");
  const [saving, setSaving]       = useState(false);
  const [refresh, setRefresh]     = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await apiPartidos();
      if (res?.data) setPartidos(res.data);
      setLoading(false);
    })();
  }, [refresh]);

  // Partido seleccionado
  const partido = useMemo(
    () => partidos.find((p) => String(p.id) === String(selectId)) ?? null,
    [partidos, selectId]
  );

  // Al seleccionar un partido, pre-carga los goles actuales
  const handleSelect = useCallback((e) => {
    const id = e.target.value;
    setSelectId(id);
    const p = partidos.find((x) => String(x.id) === id);
    if (p) {
      setGoles1(p.golesEquipo1 ?? "");
      setGoles2(p.golesEquipo2 ?? "");
    } else {
      setGoles1("");
      setGoles2("");
    }
  }, [partidos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partido) return;
    if (goles1 === "" || goles2 === "") {
      Toast.fire({ icon: "warning", title: "Ingresa los goles de ambos equipos" });
      return;
    }

    setSaving(true);
    try {
      // 1. Guardar resultado oficial
      const resPut = await apiPutPartidos({
        idPartido:    partido.id,
        golesEquipo1: Number(goles1),
        golesEquipo2: Number(goles2),
      });

      if (!resPut?.mensaje) {
        Toast.fire({ icon: "error", title: resPut?.mensaje ?? "Error al guardar" });
        return;
      }

      // 2. Calcular punteos automáticamente
      const resCalc = await apiPostCalculo(partido.id);

      if (resCalc?.exito !== 0) {
        Toast.fire({ icon: "success", title: "Resultado guardado y punteos calculados ✓" });
        setRefresh((v) => !v);
      } else {
        Toast.fire({ icon: "warning", title: "Resultado guardado, pero hubo un error al calcular punteos" });
        setRefresh((v) => !v);
      }
    } finally {
      setSaving(false);
    }
  };

  const grupos = useMemo(() => agruparPorGrupo(partidos), [partidos]);

  if (loading) return <Loading />;

  const img1 = partido ? getImg(partido.imagenEquipo1) : null;
  const img2 = partido ? getImg(partido.imagenEquipo2) : null;

  // Determina si el partido ya tiene resultado ingresado
  const tieneResultado = partido &&
    (partido.golesEquipo1 > 0 || partido.golesEquipo2 > 0);

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Ingreso de <span className="gradient-text">Resultados</span></h1>
        <p>Selecciona el partido, ingresa los goles y guarda — el cálculo es automático</p>
      </div>

      <Container className="py-4" style={{ maxWidth: 640 }}>

        {/* Selector de partido */}
        <div className="wc-field mb-4">
          <label className="wc-field__label" htmlFor="select-partido">
            Partido
          </label>
          <select
            id="select-partido"
            className="wc-field__input"
            value={selectId}
            onChange={handleSelect}
            style={{ height: 50 }}
          >
            <option value="">Selecciona un partido...</option>
            {Object.entries(grupos).sort().map(([grupo, ps]) => (
              <optgroup key={grupo} label={`Grupo ${grupo}`}>
                {ps.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombreEquipo1} vs {p.nombreEquipo2}
                    {" — "}
                    {new Date(p.fechaPartido).toLocaleDateString("es-GT", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                    })}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Panel del partido seleccionado */}
        {partido ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-card p-4">

              {/* Cabecera */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <span className="match-date-badge" style={{ marginBottom: 0 }}>
                  ⚽ Grupo {partido.grupoEquipo1}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {tieneResultado && (
                    <span style={{
                      fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.5px",
                      textTransform: "uppercase", color: "var(--brand-green)",
                      background: "rgba(22,163,74,0.12)",
                      border: "1px solid rgba(22,163,74,0.3)",
                      borderRadius: "var(--radius-full)",
                      padding: "3px 10px",
                    }}>
                      ✓ Con resultado
                    </span>
                  )}
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    {formatDate(new Date(partido.fechaPartido), "DD/MM/YYYY")}
                  </span>
                </div>
              </div>

              {/* Equipo 1 */}
              <div className="team-row" style={{ padding: "12px 4px" }}>
                {img1 && <img src={img1} alt={partido.nombreEquipo1} />}
                <span className="team-name" style={{ flex: 1 }}>
                  {partido.nombreEquipo1}
                </span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span className="score-label">Goles</span>
                  <input
                    className="input-gol"
                    type="number"
                    min="0"
                    max="99"
                    value={goles1}
                    onChange={(e) => setGoles1(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="vs-divider">vs</div>

              {/* Equipo 2 */}
              <div className="team-row" style={{ padding: "12px 4px" }}>
                {img2 && <img src={img2} alt={partido.nombreEquipo2} />}
                <span className="team-name" style={{ flex: 1 }}>
                  {partido.nombreEquipo2}
                </span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span className="score-label">Goles</span>
                  <input
                    className="input-gol"
                    type="number"
                    min="0"
                    max="99"
                    value={goles2}
                    onChange={(e) => setGoles2(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Resumen visual del resultado que se va a guardar */}
              {goles1 !== "" && goles2 !== "" && (
                <div style={{
                  margin: "1rem 0 0",
                  padding: "0.65rem 1rem",
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: "var(--radius-sm)",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  fontWeight: 600,
                }}>
                  {partido.nombreEquipo1}{" "}
                  <span style={{ color: "var(--brand-accent)", fontSize: "1.1rem", fontWeight: 800 }}>
                    {goles1} — {goles2}
                  </span>
                  {" "}{partido.nombreEquipo2}
                  {" · "}
                  {Number(goles1) > Number(goles2)
                    ? `Gana ${partido.nombreEquipo1}`
                    : Number(goles2) > Number(goles1)
                    ? `Gana ${partido.nombreEquipo2}`
                    : "Empate"}
                </div>
              )}

              <div className="mt-4">
                <button
                  className="btn-wc-primary"
                  type="submit"
                  disabled={saving || goles1 === "" || goles2 === ""}
                >
                  {saving ? "Guardando y calculando..." : "💾 Guardar y Calcular Punteos"}
                </button>
              </div>

              <p style={{
                fontSize: "0.75rem", color: "var(--text-muted)",
                textAlign: "center", marginTop: "0.75rem", marginBottom: 0,
              }}>
                Al guardar se actualizará el resultado oficial y se calcularán los punteos de todos los participantes automáticamente.
              </p>
            </div>
          </form>
        ) : (
          <MesajeNoData mesaje="Selecciona un partido para ingresar el resultado" />
        )}
      </Container>
    </div>
  );
};

export default Results;
