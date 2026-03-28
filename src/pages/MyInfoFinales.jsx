import React, { useState, useEffect, useContext } from "react";
import { Container, Tab, Tabs, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { apiComparationsFinalesUser } from "../api/apiPartidos";
import { CardFinalDisplay } from "../components/Cards/CardFinalDisplay";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";
import Loading from "./Loading/Loading";

const FASES = ["Octavos", "Cuartos", "Semifinal", "Final"];

const MyInfoFinales = () => {
  const { authState } = useContext(AuthContext);
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      const res = await apiComparationsFinalesUser(authState.user);
      if (res?.data) setPartidos(res.data);
      setLoading(false);
    })();
  }, []);

  const porFase = FASES.reduce((acc, fase) => {
    acc[fase] = partidos.filter((p) => p.grupoEquipo1 === fase);
    return acc;
  }, {});

  const fasesConPartidos = FASES.filter((f) => porFase[f]?.length > 0);

  if (loading) return <Loading />;

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Mis Predicciones <span className="gradient-text">Eliminatorias</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>

      <Container className="py-5">
        {fasesConPartidos.length === 0 ? (
          <MesajeNoData mesaje="Aún no has ingresado predicciones de eliminatorias" />
        ) : (
          <Tabs className="mb-3" justify>
            {fasesConPartidos.map((fase) => (
              <Tab key={fase} eventKey={fase} title={fase}>
                <Row xs={1} md={1} lg={2} className="g-4 mt-1">
                  {porFase[fase].map((partido) => (
                    <Col key={partido.idPartido}>
                      <div className="bg-card card-animate p-3">

                        {/* Cabecera con punteo */}
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <span className="compare-label mb-0">Tu Predicción</span>
                          {partido.punteo > 0 && (
                            <span className="points-chip">{partido.punteo} pts</span>
                          )}
                        </div>

                        <CardFinalDisplay
                          data={{
                            grupoEquipo1:  partido.grupoEquipo1,
                            imagenEquipo1: partido.imagenEquipo1,
                            nombreEquipo1: partido.nombreEquipo1,
                            imagenEquipo2: partido.imagenEquipo2,
                            nombreEquipo2: partido.nombreEquipo2,
                            fechaPartido:  partido.fechaPartido,
                            golesEquipo1:  partido.golesEquipo1,
                            golesEquipo2:  partido.golesEquipo2,
                            huboPenales:   partido.prediceHuboPenales,
                            penalesEquipo1: partido.penalesEquipo1,
                            penalesEquipo2: partido.penalesEquipo2,
                          }}
                        />

                      </div>
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

export default MyInfoFinales;
