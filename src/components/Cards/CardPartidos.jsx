import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import Moment from "react-moment";


const logoImage = require.context("../../Banderas", true);

export const CardPartidos = ({ data }) => {
  return (
    <Card className="bg-card">
      <Card.Body>
        <Card.Title className="text-center fw-bold">
          Partido del <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY"/> Grupo {data.grupoEquipo1}
        </Card.Title>
        <Row>
          <Col xs={"6"} >
            <Image src={logoImage(`./${data.imagenEquipo1}`)} />{" "}
            <span className="fw-bold">{data.nombreEquipo1}</span>
          </Col>
          <Col xs={"6"} className="mt-2 d-flex justify-content-center">
            <Card.Text className="fw-bold">Goles: {data.golesEquipo1}</Card.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={"6"} >
            <Image src={logoImage(`./${data.imagenEquipo2}`)} />
            <span className="fw-bold">{data.nombreEquipo2}</span>
          </Col>
          <Col xs={"6"} className="mt-2 d-flex justify-content-center">
            <Card.Text className="fw-bold">Goles: {data.golesEquipo2}</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

