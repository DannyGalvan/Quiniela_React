import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardMatched } from "../components/Cards/CardMatched";

export const ListForms = ({ xs, md, lg, xl, xxl, list, text,actualiza }) => {
  return (
    <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
      {list.length != 0 ? (
        list.map((partido) => (
          <Col key={partido.idPartido}>
            <CardMatched data={partido} actualiza={actualiza}/>
          </Col>
        ))
      ) : (
        <div>
          <p className="text-danger fw-bold text-center">
            {text
              ? `no se encontraron resultados con: ${text}`
              : "Aun no has llenado datos para este apartado"}
          </p>
        </div>
      )}
    </Row>
  );
};
