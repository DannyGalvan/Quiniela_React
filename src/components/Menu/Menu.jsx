import React from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVERPATH } from "../../config/configuracion";

const logoImage = require.context("../../Banderas", true);

export const Menu = ({cerrarSesion,isAdmin,show,handleClose}) => {
  return (
    <Navbar.Offcanvas
      id={`offcanvasNavbar-expand-md`}
      aria-labelledby={`offcanvasNavbarLabel-expand-md`}
      placement="end"
      style={{background: '#48823F'}}
      show={show}
      onHide={handleClose}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          id={`offcanvasNavbarLabel-expand-md`}
          className="d-flex"
        >
          <img
            alt={"logo"}
            src={`${logoImage(`./LogoMundial.webp`)}`}
            width="60"
            height="60"
            className="d-inline-block align-top rounded-circle"
          />{" "}
          <span className="mt-3 ms-1 fw-bold text-light">Mundial Qatar 2022</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Link to={`${SERVERPATH}`} className="nav-link" onClick={handleClose}>
            Inicio
          </Link>          
          <NavDropdown
            title="Resultados"
            id={`offcanvasNavbarDropdown-expand-md`}
            align={{ md: "end" }}
            menuVariant="dark"
            className="text-light"
          >
            {
              isAdmin && <Link className="dropdown-item" to={`${SERVERPATH}/table-result-country`} onClick={handleClose}>Clasificacion de Todos los Paises</Link>
            }
            <Link className="dropdown-item" to={`${SERVERPATH}/my-info`} onClick={handleClose}>Mis Resultados Por Grupos</Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/comparation-group`} onClick={handleClose}>Comparación Grupos</Link>
            <NavDropdown.Divider />
            <Link className="dropdown-item" to={`${SERVERPATH}/my-result`} onClick={handleClose}>Todos Mis Resultados</Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/comparation`} onClick={handleClose}>Comparación Todos</Link>
            <NavDropdown.Divider />      
            <Link className="dropdown-item" to={`${SERVERPATH}/table-result`} onClick={handleClose}>Tabla de Clasificación</Link>           
          </NavDropdown>
          <NavDropdown
            title="Llenar Quiniela"
            id={`offcanvasNavbarDropdown-expand-md`}
            align={{ md: "end" }}
            menuVariant="dark"
            className="text-light"
          >
            {
              isAdmin && <Link className="dropdown-item" to={`${SERVERPATH}/results`} onClick={handleClose}>Ingresar Resultado</Link>
            }
            <Link className="dropdown-item" to={`${SERVERPATH}/instructions`} onClick={handleClose}>Instrucciones</Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/post-group`} onClick={handleClose}>Por Grupos</Link>
            <NavDropdown.Divider />
            <Link className="dropdown-item" to={`${SERVERPATH}/matches`} onClick={handleClose}>Todos Los Partidos</Link>
          </NavDropdown>    
          <Nav.Link className="nav-link" onClick={cerrarSesion}>
            Cerrar Sesión
          </Nav.Link>     
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};

