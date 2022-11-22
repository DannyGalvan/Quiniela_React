import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { ListForms } from "../containers/ListForms";
import { useMatches } from "../hooks/useMatches";
import Loading from "./Loading/Loading";

const PostGroup = () => {
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
  } = useMatches(null,null);
  return (
    <div className="bg-container page-wrap">
      <h1 className="text-center fw-bold pt-3">
        Ingreso de Resultados por Grupo Mundial Quatar 2022
      </h1>
      <Container className="py-5">
        <Tabs className="mb-3" justify>
        <Tab eventKey="Grupo A" title="Grupo A">
            {!pending ? (
              <ListForms
                list={matchesA}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ) : <Loading/>}
          </Tab>
          <Tab eventKey="Grupo B" title="Grupo B">
            {!pending ? (
              <ListForms
                list={matchesB}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo C" title="Grupo C">
            {!pending ? (
              <ListForms
                list={matchesC}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo D" title="Grupo D">
            {!pending ? (
              <ListForms
                list={matchesD}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo E" title="Grupo E">
            {!pending ? (
              <ListForms
                list={matchesE}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo F" title="Grupo F">
            {!pending ? (
              <ListForms
                list={matchesF}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo G" title="Grupo G">
            {!pending ? (
              <ListForms
                list={matchesG}
                actualiza={changeFunction}
                xs={1}
                md={1}
                lg={2}
                xxl={3}
              />
            ): <Loading/>}
          </Tab>
          <Tab eventKey="Grupo H" title="Grupo H">
            {!pending ? (
              <ListForms
                list={matchesH}
                actualiza={changeFunction}
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
}

export default PostGroup

