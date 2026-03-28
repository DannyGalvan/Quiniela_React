import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ListForms } from "../containers/ListForms";
import { useMatches } from "../hooks/useMatches";
import Loading from "./Loading/Loading";

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const PostGroup = () => {
  const { pending, porGrupo, changeFunction } = useMatches(null, null);

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Ingreso por <span className="gradient-text">Grupos</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>
      <Container className="py-5">
        <Tabs className="mb-3" justify>
          {GRUPOS.map((g) => (
            <Tab key={g} eventKey={`Grupo ${g}`} title={`Grupo ${g}`}>
              {!pending ? (
                <ListForms
                  list={porGrupo[g].matches}
                  actualiza={changeFunction}
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

export default PostGroup;
