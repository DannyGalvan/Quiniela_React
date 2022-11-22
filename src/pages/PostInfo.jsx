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
      <h1 className="text-center fw-bold pt-3">
        Ingreso de Resultados por Grupo Mundial Quatar 2022
      </h1>
      <h3 className="text-center fw-bold pt-3 text-warning">
        Nota: solo puedes ingresar el Grupo Completo
      </h3>
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
