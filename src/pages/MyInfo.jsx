import React, { useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { apiPartidosUser } from "../api/apiPartidos";
import { MatchesList } from "../containers/MatchesList";
import { AuthContext } from "../context/authContext";
import { useMatches } from "../hooks/useMatches";
import Loading from "./Loading/Loading";

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const MyInfo = () => {
  const { authState } = useContext(AuthContext);
  const { pending, porGrupo } = useMatches(authState.user, apiPartidosUser);

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Mis Resultados <span className="gradient-text">por Grupo</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>
      <Container className="py-5">
        <Tabs className="mb-3" justify>
          {GRUPOS.map((g) => (
            <Tab key={g} eventKey={`Grupo ${g}`} title={`Grupo ${g}`}>
              {!pending ? (
                <MatchesList
                  list={porGrupo[g].list}
                  xs={1} md={1} lg={2} xxl={3}
                />
              ) : <Loading />}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default MyInfo;
