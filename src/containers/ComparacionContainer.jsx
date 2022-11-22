import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardPartidos } from "../components/Cards/CardPartidos";

const ComparacionContainer = ({ data }) => {
  const resultado = {
    id: data.idPartido,
    idEquipo1: data.idEquipo1,
    nombreEquipo1: data.nombreEquipo1,
    grupoEquipo1: data.grupoEquipo1,
    imagenEquipo1: data.imagenEquipo1,
    golesEquipo1: data.quinielaE1,
    idEquipo2: data.idEquipo2,
    nombreEquipo2: data.nombreEquipo2,
    grupoEquipo2: data.grupoEquipo2,
    imagenEquipo2: data.imagenEquipo2,
    golesEquipo2: data.quinielaE2,
    fechaPartido: data.fechaPartido,
  };
  const my = {
    id: data.idPartido,
    idEquipo1: data.idEquipo1,
    nombreEquipo1: data.nombreEquipo1,
    grupoEquipo1: data.grupoEquipo1,
    imagenEquipo1: data.imagenEquipo1,
    golesEquipo1: data.golesEquipo1,
    idEquipo2: data.idEquipo2,
    nombreEquipo2: data.nombreEquipo2,
    grupoEquipo2: data.grupoEquipo2,
    imagenEquipo2: data.imagenEquipo2,
    golesEquipo2: data.golesEquipo2,
    fechaPartido: data.fechaPartido,
  };
  return (
    <Row xs={1} md={2} lg={2} xl={2} xxl={2}>
      <Col>
        <p className="text-center fw-bold">Resultado Oficial</p>
        <CardPartidos data={resultado} />
      </Col>
      <Col>
        <p className="text-center fw-bold">
          Resultado Ingresado Obtuviste {" "}
          <strong className="text-danger fw-bold">{data.punteo}</strong> puntos
        </p>
        <CardPartidos data={my} />
      </Col>
    </Row>
  );
};

export default ComparacionContainer;
