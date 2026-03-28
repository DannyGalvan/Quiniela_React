import React, { useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { apiComparationsUser } from "../api/apiPartidos";
import { AuthContext } from "../context/authContext";
import { useMatches } from "../hooks/useMatches";
import { ListComparacion } from "../containers/ListComparacion";
import Loading from "./Loading/Loading";

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const CompareGroup = () => {
  const { authState } = useContext(AuthContext);
  const { pending, porGrupo } = useMatches(authState.user, apiComparationsUser);

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Comparación por <span className="gradient-text">Grupos</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>
      <Container className="py-5">
        <Tabs className="mb-3" justify>
          {GRUPOS.map((g) => (
            <Tab key={g} eventKey={`Grupo ${g}`} title={`Grupo ${g}`}>
              {!pending ? (
                <ListComparacion
                  list={porGrupo[g].list}
                  xs={1} md={1} lg={1}
                />
              ) : <Loading />}
            </Tab>
          ))}
        </Tabs>
      </Container>
    </div>
  );
};

export default CompareGroup;
