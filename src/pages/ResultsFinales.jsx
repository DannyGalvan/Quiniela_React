import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container } from "react-bootstrap";
import { apiFinales, apiPutFinales, apiPostCalculoFinal } from "../api/apiPartidos";
import { Toast } from "../components/Swal/Toast";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";
import Loading from "./Loading/Loading";
import Moment from "react-moment";

const FASES_ORDEN = ["Octavos", "Cuartos", "Semifinal", "Final"];
const FASE_COLORS = {
  Octavos: "var(--brand-accent)", Cuartos: "var(--brand-gold)",
  Semifinal: "var(--brand-red)",  Final: "var(--brand-green)",
};

const getImg = (nombre) => {
  if (!nombre) return null;
  try { return require.context("../Banderas", true)(`./${nombre}`); }
  catch { return null; }
};

const agruparPorFase = (ps) =>
  ps.reduce((acc, p) => {
    const f = p.grupoEquipo1 ?? "?";
    if (!acc[f]) acc[f] = [];
    acc[f].push(p);
    return acc;
  }, {});

const BtnEquipo = ({ eq, selected }) => (
  <div style={{
    flex: 1, padding: "0.65rem 0.75rem", borderRadius: "var(--radius-sm)",
    border: selected ? "2px solid var(--brand-accent)" : "1.5px solid var(--border-color)",
    background: selected ? "rgba(59,130,246,0.12)" : "var(--bg-surface)",
    color: "var(--text-primary)", fontWeight: selected ? 700 : 500,
    fontSize: "0.875rem", userSelect: "none",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  }}>
    {eq.img && <img src={eq.img} alt={eq.nombre} style={{ width: 24, height: 16, objectFit: "cover", borderRadius: 2 }} />}
    {eq.nombre}{selected && " ✓"}
  </div>
);

const ResultsFinales = () => {
  const [partidos, setPartidos]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [selectId, setSelectId]   = useState("");
  const [goles1, setGoles1]       = useState("");
  const [goles2, setGoles2]       = useState("");
  const [ganador, setGanador]     = useState("");
  const [huboPenales, setHuboPenales] = useState(false);
  const [pen1, setPen1]           = useState("");
  const [pen2, setPen2]           = useState("");
  const [saving, setSaving]       = useState(false);
  const [refresh, setRefresh]     = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await apiFinales();
      if (res?.data) setPartidos(res.data);
      setLoading(false);
    })();
  }, [refresh]);

  const partido = useMemo(
    () => partidos.find((p) => String(p.id) === String(selectId)) ?? null,
    [partidos, selectId]
  );

  const handleSelect = useCallback((e) => {
    const id = e.target.value;
    setSelectId(id);
    const p = partidos.find((x) => String(x.id) === id);
    if (p) {
      setGoles1(p.golesEquipo1 ?? "");
      setGoles2(p.golesEquipo2 ?? "");
      setGanador(p.ganador ? String(p.ganador) : "");
      setHuboPenales(p.huboPenales ?? false);
      setPen1(p.penalesEquipo1 ?? "");
      setPen2(p.penalesEquipo2 ?? "");
    } else {
      setGoles1(""); setGoles2(""); setGanador("");
      setHuboPenales(false); setPen1(""); setPen2("");
    }
  }, [partidos]);

  const handlePenales = (equipo, valor) => {
    if (equipo === 1) setPen1(valor); else setPen2(valor);
    const newP1 = equipo === 1 ? valor : pen1;
    const newP2 = equipo === 2 ? valor : pen2;
    if (newP1 !== "" && newP2 !== "") {
      const p1 = Number(newP1), p2 = Number(newP2);
      if (p1 > p2)      setGanador(String(partido.idEquipo1));
      else if (p2 > p1) setGanador(String(partido.idEquipo2));
      else              setGanador("");
    } else {
      setGanador("");
    }
  };

  const handleGoles = (equipo, valor) => {
    if (equipo === 1) setGoles1(valor); else setGoles2(valor);
    const newG1 = equipo === 1 ? valor : goles1;
    const newG2 = equipo === 2 ? valor : goles2;
    if (newG1 !== "" && newG2 !== "") {
      const n1 = Number(newG1), n2 = Number(newG2);
      if (n1 > n2)      { setGanador(String(partido.idEquipo1)); setHuboPenales(false); setPen1(""); setPen2(""); }
      else if (n2 > n1) { setGanador(String(partido.idEquipo2)); setHuboPenales(false); setPen1(""); setPen2(""); }
      else              { setGanador(""); }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partido || goles1 === "" || goles2 === "") {
      Toast.fire({ icon: "warning", title: "Ingresa los goles de ambos equipos" });
      return;
    }
    if (!ganador) {
      Toast.fire({ icon: "warning", title: "Selecciona el equipo ganador" });
      return;
    }
    if (esEmpate && !huboPenales) {
      Toast.fire({ icon: "warning", title: "Hay empate — activa 'Hubo penales' para definir ganador" });
      return;
    }
    if (huboPenales && (pen1 === "" || pen2 === "")) {
      Toast.fire({ icon: "warning", title: "Ingresa el marcador de penales" });
      return;
    }

    const nombreGanador =
      String(ganador) === String(partido.idEquipo1) ? partido.nombreEquipo1 : partido.nombreEquipo2;
    const penSufijo = huboPenales ? ` (pen. ${pen1}-${pen2})` : "";
    const { isConfirmed } = await import("sweetalert2").then((Swal) =>
      Swal.default.fire({
        title: "¿Confirmar resultado?",
        html: `<b>${partido.nombreEquipo1} ${goles1} — ${goles2} ${partido.nombreEquipo2}</b><br/>Gana: <b>${nombreGanador}</b>${penSufijo}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "var(--brand-accent, #3b82f6)",
      })
    );
    if (!isConfirmed) return;

    setSaving(true);
    try {
      const resPut = await apiPutFinales({
        idPartido:    partido.id,
        golesEquipo1: Number(goles1),
        golesEquipo2: Number(goles2),
        ganador:      Number(ganador),
        huboPenales,
        penalesEquipo1: huboPenales ? Number(pen1) : null,
        penalesEquipo2: huboPenales ? Number(pen2) : null,
      });

      if (!resPut?.mensaje) {
        Toast.fire({ icon: "error", title: "Error al guardar" });
        return;
      }

      const resCalc = await apiPostCalculoFinal(partido.id);
      if (resCalc?.exito !== 0) {
        Toast.fire({ icon: "success", title: "Resultado guardado y punteos calculados ✓" });
      } else {
        Toast.fire({ icon: "warning", title: "Guardado, pero error al calcular punteos" });
      }
      setRefresh((v) => !v);
    } finally {
      setSaving(false);
    }
  };

  const grupos = useMemo(() => agruparPorFase(partidos), [partidos]);
  if (loading) return <Loading />;

  const img1 = partido ? getImg(partido.imagenEquipo1) : null;
  const img2 = partido ? getImg(partido.imagenEquipo2) : null;
  const tieneResultado = partido && partido.ganador > 0;
  const esEmpate = goles1 !== "" && goles2 !== "" && Number(goles1) === Number(goles2);

  const resumenTexto = () => {
    if (!ganador || goles1 === "" || goles2 === "") return null;
    const nombre = String(ganador) === String(partido.idEquipo1) ? partido.nombreEquipo1 : partido.nombreEquipo2;
    const sufijo = huboPenales ? ` (pen. ${pen1 || "?"}-${pen2 || "?"})` : "";
    return `Gana ${nombre}${sufijo}`;
  };

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Resultados <span className="gradient-text">Eliminatorias</span></h1>
        <p>Ingresa el resultado oficial — el cálculo de punteos es automático</p>
      </div>

      <Container className="py-4" style={{ maxWidth: 640 }}>
        <div className="wc-field mb-4">
          <label className="wc-field__label" htmlFor="sel-final">Partido Eliminatorio</label>
          <select id="sel-final" className="wc-field__input" value={selectId} onChange={handleSelect} style={{ height: 50 }}>
            <option value="">Selecciona un partido...</option>
            {FASES_ORDEN.filter((f) => grupos[f]?.length).map((fase) => (
              <optgroup key={fase} label={fase}>
                {grupos[fase].map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombreEquipo1} vs {p.nombreEquipo2} — {new Date(p.fechaPartido).toLocaleDateString("es-GT", { day: "2-digit", month: "2-digit", year: "numeric" })}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {partido ? (
          <form onSubmit={handleSubmit}>
            <div className="bg-card p-4">
              {/* Cabecera */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <span className="match-date-badge" style={{ marginBottom: 0, background: `linear-gradient(135deg, ${FASE_COLORS[partido.grupoEquipo1] ?? "var(--brand-accent)"}cc, ${FASE_COLORS[partido.grupoEquipo1] ?? "var(--brand-accent)"}66)` }}>
                  🏆 {partido.grupoEquipo1}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {tieneResultado && (
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--brand-green)", background: "rgba(22,163,74,0.12)", border: "1px solid rgba(22,163,74,0.3)", borderRadius: "var(--radius-full)", padding: "3px 10px" }}>
                      ✓ Con resultado
                    </span>
                  )}
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                    <Moment date={new Date(partido.fechaPartido)} format="DD/MM/YYYY" />
                  </span>
                </div>
              </div>

              {/* Goles */}
              {[{ eq: 1, nombre: partido.nombreEquipo1, img: img1, val: goles1 },
                { eq: 2, nombre: partido.nombreEquipo2, img: img2, val: goles2 }].map(({ eq, nombre, img, val }, i) => (
                <React.Fragment key={eq}>
                  {i === 1 && <div className="vs-divider">vs</div>}
                  <div className="team-row" style={{ padding: "12px 4px" }}>
                    {img && <img src={img} alt={nombre} />}
                    <span className="team-name" style={{ flex: 1 }}>{nombre}</span>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span className="score-label">Goles</span>
                      <input className="input-gol" type="number" min="0" max="99" value={val}
                        onChange={(e) => handleGoles(eq, e.target.value)} required autoFocus={eq === 1} />
                    </div>
                  </div>
                </React.Fragment>
              ))}

              {/* Ganador */}
              <div className="wc-field mt-4">
                <label className="wc-field__label">
                  Equipo Ganador
                  {esEmpate && huboPenales
                    ? <span style={{ color: "var(--brand-gold)", marginLeft: 6, fontWeight: 700 }}>— Determinado por penales</span>
                    : ganador
                      ? <span style={{ color: "var(--brand-green)", marginLeft: 6, fontWeight: 600 }}>— Determinado por marcador</span>
                      : null}
                </label>
                <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                  <BtnEquipo
                    eq={{ id: partido.idEquipo1, nombre: partido.nombreEquipo1, img: img1 }}
                    selected={String(ganador) === String(partido.idEquipo1)}
                  />
                  <BtnEquipo
                    eq={{ id: partido.idEquipo2, nombre: partido.nombreEquipo2, img: img2 }}
                    selected={String(ganador) === String(partido.idEquipo2)}
                  />
                </div>
              </div>

              {/* Toggle penales */}
              <div className="mt-4" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button type="button" disabled={!esEmpate} onClick={() => {
                  const turning = !huboPenales;
                  setHuboPenales(turning);
                  setPen1(""); setPen2("");
                  if (!turning) setGanador("");
                }}
                  style={{
                    padding: "0.5rem 1.25rem", borderRadius: "var(--radius-sm)",
                    cursor: esEmpate ? "pointer" : "not-allowed",
                    opacity: esEmpate ? 1 : 0.4,
                    border: huboPenales ? "2px solid var(--brand-gold)" : "1.5px solid var(--border-color)",
                    background: huboPenales ? "rgba(245,158,11,0.12)" : "var(--bg-surface)",
                    color: huboPenales ? "var(--brand-gold)" : "var(--text-secondary)",
                    fontWeight: huboPenales ? 700 : 500, fontSize: "0.875rem", transition: "var(--transition)",
                  }}>
                  🥅 {huboPenales ? "Hubo penales ✓" : "¿Hubo penales?"}
                </button>
                {huboPenales && (
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    Ingresa el marcador de penales
                  </span>
                )}
              </div>

              {/* Marcador de penales */}
              {huboPenales && (
                <div style={{ display: "flex", gap: 16, marginTop: 12, alignItems: "center" }}>
                  {[{ nombre: partido.nombreEquipo1, val: pen1, eq: 1 },
                    { nombre: partido.nombreEquipo2, val: pen2, eq: 2 }].map(({ nombre, val, eq }, i) => (
                    <React.Fragment key={i}>
                      {i === 1 && <span style={{ color: "var(--text-muted)", fontWeight: 700 }}>—</span>}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                        <span className="score-label">{nombre}</span>
                        <input className="input-gol" type="number" min="0" max="99" value={val}
                          onChange={(e) => handlePenales(eq, e.target.value)} required={huboPenales} />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* Resumen */}
              {resumenTexto() && (
                <div style={{ margin: "1rem 0 0", padding: "0.65rem 1rem", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "var(--radius-sm)", textAlign: "center", fontSize: "0.875rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                  {partido.nombreEquipo1}{" "}
                  <span style={{ color: "var(--brand-accent)", fontSize: "1.1rem", fontWeight: 800 }}>{goles1} — {goles2}</span>
                  {" "}{partido.nombreEquipo2} · {resumenTexto()}
                </div>
              )}

              <div className="mt-4">
                <button className="btn-wc-primary" type="submit" disabled={saving || !ganador || goles1 === "" || goles2 === "" || (huboPenales && (pen1 === "" || pen2 === ""))}>
                  {saving ? "Guardando y calculando..." : "💾 Guardar y Calcular Punteos"}
                </button>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center", marginTop: "0.75rem", marginBottom: 0 }}>
                Al guardar se actualizará el resultado oficial y se calcularán los punteos automáticamente.
              </p>
            </div>
          </form>
        ) : (
          <MesajeNoData mesaje="Selecciona un partido eliminatorio para ingresar el resultado" />
        )}
      </Container>
    </div>
  );
};

export default ResultsFinales;
