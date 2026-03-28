import React, { useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { MatchedInput } from "../containers/MatchedInput";
import { AuthContext } from "../context/authContext";
import { useMatches } from "../hooks/useMatches";
import { apiPartidosUser } from "../api/apiPartidos";
import Loading from "./Loading/Loading";

const PostInfo = () => {
  const { authState } = useContext(AuthContext);
  const {
    pending,
    matchesA,
    matchesB,
    matchesC,
    matchesD,
    matchesE,
    matchesF,
    matchesG,
    matchesH,
    changeFunction,
  } = useMatches(authState.user, apiPartidosUser);

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Ingreso por <span className="gradient-text">Grupos</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>
      <div style={{
        margin: "0 auto 0.5rem",
        maxWidth: 520,
        background: "rgba(245, 158, 11, 0.12)",
        border: "1.5px solid rgba(245, 158, 11, 0.35)",
        borderRadius: "var(--radius-md)",
        padding: "0.65rem 1.25rem",
        textAlign: "center",
        fontSize: "0.875rem",
        fontWeight: 600,
        color: "var(--brand-gold)",
      }}>
        ⚠️ Solo puedes ingresar el grupo completo
      </div>
      <Container className="py-5">
        <Tabs className="mb-3" justify>
        <Tab eventKey="Grupo A" title="Grupo A">
            {!pending ? (
              <MatchedInput
                list={matchesA}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ) : <Loading/>}
          </Tab>
          <Tab eventKey="Grupo B" title="Grupo B">
            {!pending ? (
              <MatchedInput
                list={matchesB}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo C" title="Grupo C">
            {!pending ? (
              <MatchedInput
                list={matchesC}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo D" title="Grupo D">
            {!pending ? (
              <MatchedInput
                list={matchesD}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo E" title="Grupo E">
            {!pending ? (
              <MatchedInput
                list={matchesE}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo F" title="Grupo F">
            {!pending ? (
              <MatchedInput
                list={matchesF}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo G" title="Grupo G">
            {!pending ? (
              <MatchedInput
                list={matchesG}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo H" title="Grupo H">
            {!pending ? (
              <MatchedInput
                list={matchesH}
                idUsuario={authState.user}
                change={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default PostInfo;
