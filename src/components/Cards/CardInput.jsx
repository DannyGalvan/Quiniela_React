import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import Moment from "react-moment";
import moment from 'moment';

const logoImage = require.context("../../Banderas", true);

export const CardInput = ({ data, id, form, handleChange }) => {
  const now = new Date();
  const match = new Date(data.fechaPartido);
  const disabled = now > match;
  return (
    <Card className="bg-card">
      <Card.Body>
        <Card.Title className="text-center fw-bold">
          Partido del <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY"/> Grupo {data.grupoEquipo1}
        </Card.Title>
        <Row>
          <input
            className="input-gol"
            name={`IdPartido${id}`}
            value={(form[`IdPartido${id}`] = data.id)}
            type="hidden"
            required
          />
        </Row>
        <Row>
          <Col xs={"6"}>
            <Image src={logoImage(`./${data.imagenEquipo1}`)} />{" "}
            <span className="fw-bold">{data.nombreEquipo1}</span>
          </Col>
          <Col xs={"6"} className="mt-2 d-flex justify-content-center">
            <div className="fw-bold">
              <strong className="me-3">Goles: </strong>
              <input
                className="input-gol"
                name={`GolesP${id}`}
                value={form[`GolesP${id}`]}
                onChange={handleChange}
                type="number"
                required
                disabled={disabled}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={"6"}>
            <Image src={logoImage(`./${data.imagenEquipo2}`)} />
            <span className="fw-bold">{data.nombreEquipo2}</span>
          </Col>
          <Col xs={"6"} className="mt-2 d-flex justify-content-center">
            <div className="fw-bold">
              <strong className="me-3">Goles: </strong>
              <input
                className="input-gol"
                name={`GolesS${id}`}
                value={form[`GolesS${id}`]}
                onChange={handleChange}
                type="number"
                required
                disabled={disabled}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
