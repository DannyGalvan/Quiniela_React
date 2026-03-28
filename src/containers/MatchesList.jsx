import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardPartidos } from "../components/Cards/CardPartidos";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";

export const MatchesList = ({ list, text, xs, md, lg, xl, xxl }) => {
  return (
    <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
      {list.length !== 0 ? (
        list.map((partido) => (
          <Col key={partido.id}>
            <CardPartidos data={partido} />
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <MesajeNoData
            mesaje={
              text
                ? `No se encontraron resultados con: "${text}"`
                : "Aún no hay datos para este apartado"
            }
          />
        </Col>
      )}
    </Row>
  );
};
