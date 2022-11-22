import React from "react";
import { Col, Row } from "react-bootstrap";

export const InputDateDuo = (props) => {
  const {
    inicio,
    searchInicio,
    onChangeDateInicio,
    fin,
    searchFin,
    onChangeDateFin,
  } = props;
  
  return (
    <Row className="mb-3">
      <Col>
        <label>Fecha Inicial</label>
        <input
          type="date"
          name="inicio"
          className="form-control"
          value={inicio}
          ref={searchInicio}
          onChange={onChangeDateInicio}
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </Col>
      <Col>
        <label>Fecha Final</label>
        <input
          type="date"
          name="fin"
          className="form-control"
          value={fin}
          ref={searchFin}
          onChange={onChangeDateFin}
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </Col>
    </Row>
  );
};
