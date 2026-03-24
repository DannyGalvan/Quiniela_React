import React, { useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { apiPartidosUser } from "../api/apiPartidos";
import { MatchesList } from "../containers/MatchesList";
import { AuthContext } from "../context/authContext";
import { useMatches } from "../hooks/useMatches";
import Loading from "./Loading/Loading";

const MyInfo = () => {
    const { authState } = useContext(AuthContext);
    const {
      pending,
      listA,
      listB,
      listC,
      listD,
      listE,
      listF,
      listG,
      listH,
    } = useMatches(authState.user,apiPartidosUser);
  
    return (
      <div className="bg-container page-wrap">
        <div className="page-hero">
          <h1>Mis Resultados <span className="gradient-text">por Grupo</span></h1>
          <p>Mundial 2026 — USA · Canadá · México</p>
        </div>
        <Container className="py-5">
          <Tabs className="mb-3" justify>
          <Tab eventKey="Grupo A" title="Grupo A">
              {!pending ? (
                <MatchesList
                  list={listA}
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ) : <Loading/>}
            </Tab>
            <Tab eventKey="Grupo B" title="Grupo B">
              {!pending ? (
                <MatchesList
                  list={listB}                  
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ): <Loading/>}
            </Tab>
            <Tab eventKey="Grupo C" title="Grupo C">
              {!pending ? (
                <MatchesList
                  list={listC}                  
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ): <Loading/>}
            </Tab>
            <Tab eventKey="Grupo D" title="Grupo D">
              {!pending ? (
                <MatchesList
                  list={listD}                 
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ): <Loading/>}
            </Tab>
            <Tab eventKey="Grupo E" title="Grupo E">
              {!pending ? (
                <MatchesList
                  list={listE}                
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ): <Loading/>}
            </Tab>
            <Tab eventKey="Grupo F" title="Grupo F">
              {!pending ? (
                <MatchesList
                  list={listF}         
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ): <Loading/>}
            </Tab>
            <Tab eventKey="Grupo G" title="Grupo G">
              {!pending ? (
                <MatchesList
                  list={listG}
                  xs={1}
                  md={1}
                  lg={2}
                  xxl={3}
                />
              ): <Loading/>}
            </Tab>
            <Tab eventKey="Grupo H" title="Grupo H">
              {!pending ? (
                <MatchesList
                  list={listH}
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

export default MyInfo
