import React from 'react'
import { Col, Row } from 'react-bootstrap';
import ComparacionContainer from './ComparacionContainer';

export const ListComparacion = ({ xs, md, lg, xl, xxl, list, text }) => {
    return (
        <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
          {list.length != 0 ? (
            list.map((partido) => (
              <Col key={partido.idPartido}>
                <ComparacionContainer  data={partido} />
              </Col>
            ))
          ) : (
            <div>
              <p className="text-danger fw-bold text-center">
                {text ? `no se encontraron resultados con: ${text}` : 'Aun no has llenado datos para este apartado'} 
              </p>
            </div>
          )}
        </Row>
      );
}

