import React, {useState,useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import { TableCountry } from "../components/Tables/TableCountry";

const TableResultsCountry = () => {
   const [width, setWidth] = useState(false);
   useEffect(() => {
   (()=>{
    const resScreenResize = () => {
        const witd = document.querySelector("body").clientWidth;
        if (witd > 700) {
          setWidth(false);
        } else {
          setWidth(true);
        }
      };
      resScreenResize();
      window.addEventListener("resize", resScreenResize);
   })()
   }, []) 
  return (
    <div className="page-wrap bg-container container-fluid">
      <h1 className="py-3 text-center fw-bold">
        Tablas de Clasificación por País
      </h1>
      <Row>
        <Col sm={12} md={12} lg={6}>
          <TableCountry
            idCountry={1}
            width={width}
            title={"Posiciones Guatemala"}
          />
           <hr className="border border-primary border-3 opacity-75"/>
        </Col>
        <Col sm={12} md={12} lg={6}>
          <TableCountry
            idCountry={2}
            width={width}
            title={"Posiciones El Salvador"}
          />
           <hr className="border border-primary border-3 opacity-75"/>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={6}>
          <TableCountry
            idCountry={3}
            width={width}
            title={"Posiciones Honduras"}
          />
           <hr className="border border-primary border-3 opacity-75"/>
        </Col>
        <Col sm={12} md={12} lg={6}>
          <TableCountry
            idCountry={4}
            width={width}
            title={"Posiciones Nicaragua"}
          />
           <hr className="border border-primary border-3 opacity-75"/>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={12} lg={6}>
          <TableCountry
            idCountry={5}
            width={width}
            title={"Posiciones Costa Rica"}
          />
           <hr className="border border-primary border-3 opacity-75"/>
        </Col>
        <Col sm={12} md={12} lg={6}>
          <TableCountry
            idCountry={6}
            width={width}
            title={"Posiciones Panamá"}
          />
           <hr className="border border-primary border-3 opacity-75"/>
        </Col>
      </Row>
    </div>
  );
};

export default TableResultsCountry;
