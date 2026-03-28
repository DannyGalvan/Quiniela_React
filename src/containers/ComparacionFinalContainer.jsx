import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardFinalDisplay } from "../components/Cards/CardFinalDisplay";

// Campos que llegan del backend (ComparacionRepositorio.ObtenerComparacionesFinales):
//   oficial:    quinielaE1 / quinielaE2 / huboPenales / quinielaPenales1 / quinielaPenales2
//   prediccion: golesEquipo1 / golesEquipo2 / prediceHuboPenales / penalesEquipo1 / penalesEquipo2
//   punteo, grupoEquipo1 (= Fase), imagenEquipo*, nombreEquipo*, fechaPartido

const ComparacionFinalContainer = ({ data }) => {
  const base = {
    grupoEquipo1:  data.grupoEquipo1,
    imagenEquipo1: data.imagenEquipo1,
    nombreEquipo1: data.nombreEquipo1,
    imagenEquipo2: data.imagenEquipo2,
    nombreEquipo2: data.nombreEquipo2,
    fechaPartido:  data.fechaPartido,
  };

  const oficial = {
    ...base,
    golesEquipo1: data.quinielaE1,
    golesEquipo2: data.quinielaE2,
    huboPenales:  data.huboPenales,
    penalesEquipo1: data.quinielaPenales1,
    penalesEquipo2: data.quinielaPenales2,
  };

  const miPrediccion = {
    ...base,
    golesEquipo1: data.golesEquipo1,
    golesEquipo2: data.golesEquipo2,
    huboPenales:  data.prediceHuboPenales,
    penalesEquipo1: data.penalesEquipo1,
    penalesEquipo2: data.penalesEquipo2,
  };

  return (
    <Row xs={1} md={2} className="g-3 align-items-start">
      <Col>
        <p className="compare-label">Resultado Oficial</p>
        <CardFinalDisplay data={oficial} />
      </Col>
      <Col>
        <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
          <p className="compare-label mb-0">Tu Resultado</p>
          <span className="points-chip">{data.punteo} pts</span>
        </div>
        <CardFinalDisplay data={miPrediccion} />
      </Col>
    </Row>
  );
};

export default ComparacionFinalContainer;
