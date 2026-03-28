import React, { useState, useEffect, useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import { apiComparationsFinalesUser } from "../api/apiPartidos";
import { ListComparacionFinal } from "../containers/ListComparacionFinal";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";
import Loading from "./Loading/Loading";

const FASES = ["Octavos", "Cuartos", "Semifinal", "Final"];

const CompareFinales = () => {
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
        <h1>Comparación <span className="gradient-text">Eliminatorias</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>

      <Container className="py-5">
        {fasesConPartidos.length === 0 ? (
          <MesajeNoData mesaje="Aún no hay comparaciones de eliminatorias disponibles" />
        ) : (
          <Tabs className="mb-3" justify>
            {fasesConPartidos.map((fase) => (
              <Tab key={fase} eventKey={fase} title={fase}>
                <ListComparacionFinal
                  list={porFase[fase]}
                  xs={1} md={1} lg={1}
                />
              </Tab>
            ))}
          </Tabs>
        )}
      </Container>
    </div>
  );
};

export default CompareFinales;
