import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardPartidos } from "../components/Cards/CardPartidos";

export const MatchesList = ({ list,text, xs, md, lg, xl, xxl }) => {
  return (
    <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
      {list.length != 0 ? (
        list.map((partido) => (
          <Col key={partido.id}>
            <CardPartidos data={partido} />
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
