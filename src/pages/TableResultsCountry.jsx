import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TableCountry } from "../components/Tables/TableCountry";

const countries = [
  { id: 1, title: "Guatemala" },
  { id: 2, title: "El Salvador" },
  { id: 3, title: "Honduras" },
  { id: 4, title: "Nicaragua" },
  { id: 5, title: "Costa Rica" },
  { id: 6, title: "Panamá" },
];

const TableResultsCountry = () => {
  const [width, setWidth] = useState(false);

  useEffect(() => {
    const resScreenResize = () => {
      setWidth(document.querySelector("body").clientWidth <= 700);
    };
    resScreenResize();
    window.addEventListener("resize", resScreenResize);
    return () => window.removeEventListener("resize", resScreenResize);
  }, []);

  return (
    <div className="page-wrap bg-container">
      <div className="page-hero">
        <h1>Clasificación por <span className="gradient-text">País</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>

      <Container fluid className="px-4 pb-5">
        <Row className="g-4">
          {countries.map(({ id, title }) => (
            <Col key={id} xs={12} lg={6}>
              <div className="bg-card p-3">
                <TableCountry
                  idCountry={id}
                  width={width}
                  title={`🏅 Posiciones ${title}`}
                />
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TableResultsCountry;
