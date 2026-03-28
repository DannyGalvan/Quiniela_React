import React from "react";
import { Col, Row } from "react-bootstrap";

export const InputDateDuo = ({
  inicio,
  searchInicio,
  onChangeDateInicio,
  fin,
  searchFin,
  onChangeDateFin,
}) => {
  return (
    <Row className="mb-3 g-3">
      <Col xs={12} sm={6}>
        <div className="wc-field">
          <label className="wc-field__label" htmlFor="date-inicio">
            Fecha Inicial
          </label>
          <input
            id="date-inicio"
            type="date"
            name="inicio"
            className="wc-field__input"
            value={inicio}
            ref={searchInicio}
            onChange={onChangeDateInicio}
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </div>
      </Col>
      <Col xs={12} sm={6}>
        <div className="wc-field">
          <label className="wc-field__label" htmlFor="date-fin">
            Fecha Final
          </label>
          <input
            id="date-fin"
            type="date"
            name="fin"
            className="wc-field__input"
            value={fin}
            ref={searchFin}
            onChange={onChangeDateFin}
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </div>
      </Col>
    </Row>
  );
};
