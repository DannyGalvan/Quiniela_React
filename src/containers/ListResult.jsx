import React from "react";
import { Col, Row } from "react-bootstrap";
import { CardResult } from "../components/Cards/CardResult";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";

export const ListResult = ({ xs, md, lg, xl, xxl, list, text, func, isAdmin }) => {
  return (
    <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
      {list.length !== 0 ? (
        list.map((partido) => (
          <Col key={partido.id}>
            <CardResult data={partido} func={func} isAdmin={isAdmin} />
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <MesajeNoData mesaje={text ?? "No hay datos disponibles"} />
        </Col>
      )}
    </Row>
  );
};

