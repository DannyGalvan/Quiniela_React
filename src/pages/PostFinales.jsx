import React, { useState, useEffect, useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { apiTodosFinalesUser } from "../api/apiPartidos";
import { CardFinal } from "../components/Cards/CardFinal";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";
import Loading from "./Loading/Loading";
import { Col, Row } from "react-bootstrap";

const FASES_ORDEN = ["Octavos", "Cuartos", "Semifinal", "Final"];

const PostFinales = () => {
  const { authState } = useContext(AuthContext);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      const res = await apiTodosFinalesUser();
      if (res?.data) setPartidos(res.data);
      setLoading(false);
    })();
  }, []);

  const porFase = FASES_ORDEN.reduce((acc, fase) => {
    acc[fase] = partidos.filter((p) => p.grupoEquipo1 === fase);
    return acc;
  }, {});

  const fasesConPartidos = FASES_ORDEN.filter((f) => porFase[f]?.length > 0);

  if (loading) return <Loading />;

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Predicción <span className="gradient-text">Eliminatorias</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>

      <div style={{
        margin: "0 auto 0.5rem", maxWidth: 560,
        background: "rgba(245,158,11,0.12)", border: "1.5px solid rgba(245,158,11,0.35)",
        borderRadius: "var(--radius-md)", padding: "0.65rem 1.25rem",
        textAlign: "center", fontSize: "0.875rem", fontWeight: 600, color: "var(--brand-gold)",
      }}>
        🏆 Resultado exacto: 3 pts · Solo ganador: 1 pt · Acertar penales: +1 pt · Acertar marcador penales: +2 pts
      </div>

      <Container className="py-4">
        {fasesConPartidos.length === 0 ? (
          <MesajeNoData mesaje="Aún no hay partidos eliminatorios disponibles" />
        ) : (
          <Tabs className="mb-3" justify>
            {fasesConPartidos.map((fase) => (
              <Tab key={fase} eventKey={fase} title={fase}>
                <Row xs={1} md={1} lg={2} className="g-4 mt-1">
                  {porFase[fase].map((partido) => (
                    <Col key={partido.idPartido ?? partido.id}>
                      <CardFinal data={partido} />
                    </Col>
                  ))}
                </Row>
              </Tab>
            ))}
          </Tabs>
        )}
      </Container>
    </div>
  );
};

export default PostFinales;
