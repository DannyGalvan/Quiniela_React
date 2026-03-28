import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TableCountry } from "../components/Tables/TableCountry";
import { apiPaises } from "../api/apiPaises";
import Loading from "./Loading/Loading";

const TableResultsCountry = () => {
  const [paises, setPaises]   = useState([]);
  const [width, setWidth]     = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resScreenResize = () => {
      setWidth(document.querySelector("body").clientWidth <= 700);
    };
    resScreenResize();
    window.addEventListener("resize", resScreenResize);
    return () => window.removeEventListener("resize", resScreenResize);
  }, []);

  useEffect(() => {
    (async () => {
      const res = await apiPaises();
      if (res?.data) setPaises(res.data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="page-wrap bg-container">
      <div className="page-hero">
        <h1>Clasificación por <span className="gradient-text">País</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>

      <Container fluid className="px-4 pb-5">
        <Row className="g-4">
          {paises.map((pais) => (
            <Col key={pais.id} xs={12} lg={6}>
              <div className="bg-card p-3">
                <TableCountry
                  idCountry={pais.id}
                  width={width}
                  title={`🏅 Posiciones ${pais.nombre}`}
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
