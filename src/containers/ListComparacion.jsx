import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ComparacionContainer from './ComparacionContainer';
import { MesajeNoData } from '../components/Mesages/MesajeNoData';

export const ListComparacion = ({ xs, md, lg, xl, xxl, list, text }) => {
  return (
    <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
      {list.length !== 0 ? (
        list.map((partido) => (
          <Col key={partido.idPartido}>
            <ComparacionContainer data={partido} />
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

