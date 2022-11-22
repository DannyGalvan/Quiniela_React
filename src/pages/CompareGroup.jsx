import React, { useContext } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { apiComparationsUser} from "../api/apiPartidos";
import { AuthContext } from "../context/authContext";
import { useMatches } from "../hooks/useMatches";
import { ListComparacion } from "../containers/ListComparacion";
import Loading from "./Loading/Loading";

const CompareGroup = () => {
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
    } = useMatches(authState.user,apiComparationsUser);
    
  return (
    <div className="bg-container page-wrap">
    <h1 className="text-center fw-bold pt-3">
      Comparacion por Grupos Mundial Qatar 2022
    </h1>
    <Container className="py-5">
      <Tabs className="mb-3" justify>
      <Tab eventKey="Grupo A" title="Grupo A">
          {!pending ? (
            <ListComparacion
              list={listA}
              xs={1} md={1} lg={1}
            />
          ) : <Loading/>}
        </Tab>
        <Tab eventKey="Grupo B" title="Grupo B">
          {!pending ? (
            <ListComparacion
              list={listB}                  
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
        <Tab eventKey="Grupo C" title="Grupo C">
          {!pending ? (
            <ListComparacion
              list={listC}                  
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
        <Tab eventKey="Grupo D" title="Grupo D">
          {!pending ? (
            <ListComparacion
              list={listD}                 
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
        <Tab eventKey="Grupo E" title="Grupo E">
          {!pending ? (
            <ListComparacion
              list={listE}                
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
        <Tab eventKey="Grupo F" title="Grupo F">
          {!pending ? (
            <ListComparacion
              list={listF}         
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
        <Tab eventKey="Grupo G" title="Grupo G">
          {!pending ? (
            <ListComparacion
              list={listG}
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
        <Tab eventKey="Grupo H" title="Grupo H">
          {!pending ? (
            <ListComparacion
              list={listH}
              xs={1} md={1} lg={1}
            />
          ): <Loading/>}
        </Tab>
      </Tabs>
    </Container>
  </div>
  )
}

export default CompareGroup
