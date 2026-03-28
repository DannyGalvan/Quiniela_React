import React from "react";
import { Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SERVERPATH } from "../../config/configuracion";
import { createImageLoader } from "../../utils/imageLoader";

const logoImage = createImageLoader("../../Banderas");

export const Menu = ({ cerrarSesion, isAdmin, show, handleClose, theme, toggleTheme }) => {
  return (
    <Navbar.Offcanvas
      id="offcanvasNavbar-expand-md"
      aria-labelledby="offcanvasNavbarLabel-expand-md"
      placement="end"
      className="offcanvas-wc"
      show={show}
      onHide={handleClose}
    >
      {/* Header del panel (solo visible en mobile cuando se abre el offcanvas) */}
      <Offcanvas.Header closeButton>
        <Offcanvas.Title
          id="offcanvasNavbarLabel-expand-md"
          className="navbar-brand-wc"
        >
          <img
            alt="Logo Mundial 2026"
            src={`${logoImage(`./LogoMundial.webp`)}`}
            width="44"
            height="44"
          />
          <div className="brand-text">
            <span className="brand-name">Quiniela Mundial</span>
            <span className="brand-year">2026</span>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>

      {/* Body: se muestra inline en desktop, dentro del panel en mobile */}
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3 align-items-md-center gap-1">

          <Link to={`${SERVERPATH}`} className="nav-link" onClick={handleClose}>
            🏠 Inicio
          </Link>

          <NavDropdown
            title="📊 Resultados"
            id="offcanvasNavbarDropdown-resultados"
            align={{ md: "end" }}
            menuVariant="dark"
          >
            {isAdmin && (
              <Link
                className="dropdown-item"
                to={`${SERVERPATH}/table-result-country`}
                onClick={handleClose}
              >
                Clasificación Todos los Países
              </Link>
            )}
            <Link className="dropdown-item" to={`${SERVERPATH}/my-info`} onClick={handleClose}>
              Mis Resultados Por Grupos
            </Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/comparation-group`} onClick={handleClose}>
              Comparación Grupos
            </Link>
            <NavDropdown.Divider />
            <Link className="dropdown-item" to={`${SERVERPATH}/my-result`} onClick={handleClose}>
              Todos Mis Resultados
            </Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/comparation`} onClick={handleClose}>
              Comparación Todos
            </Link>
            <NavDropdown.Divider />
            <Link className="dropdown-item" to={`${SERVERPATH}/table-result`} onClick={handleClose}>
              Tabla de Clasificación
            </Link>
          </NavDropdown>

          <NavDropdown
            title="⚽ Llenar Quiniela"
            id="offcanvasNavbarDropdown-quiniela"
            align={{ md: "end" }}
            menuVariant="dark"
          >
            {isAdmin && (
              <Link
                className="dropdown-item"
                to={`${SERVERPATH}/results`}
                onClick={handleClose}
              >
                Ingresar Resultado Grupos
              </Link>
            )}
            {isAdmin && (
              <Link
                className="dropdown-item"
                to={`${SERVERPATH}/results-finales`}
                onClick={handleClose}
              >
                Ingresar Resultado Finales
              </Link>
            )}
            {isAdmin && (
              <Link
                className="dropdown-item"
                to={`${SERVERPATH}/mantenimiento-partidos`}
                onClick={handleClose}
              >
                Mantenimiento Partidos
              </Link>
            )}
            {isAdmin && (
              <Link
                className="dropdown-item"
                to={`${SERVERPATH}/mantenimiento-finales`}
                onClick={handleClose}
              >
                Mantenimiento Finales
              </Link>
            )}
            <Link className="dropdown-item" to={`${SERVERPATH}/instructions`} onClick={handleClose}>
              Instrucciones
            </Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/post-group`} onClick={handleClose}>
              Por Grupos
            </Link>
            <Link className="dropdown-item" to={`${SERVERPATH}/post-finales`} onClick={handleClose}>
              Eliminatorias
            </Link>
            <NavDropdown.Divider />
            <Link className="dropdown-item" to={`${SERVERPATH}/matches`} onClick={handleClose}>
              Todos Los Partidos
            </Link>
          </NavDropdown>

          <Nav.Link onClick={cerrarSesion}>
            🚪 Cerrar Sesión
          </Nav.Link>

          {/* Toggle tema — se ve en la navbar en desktop, y en el panel en mobile */}
          {toggleTheme && (
            <button
              className="btn-theme-toggle ms-md-2"
              onClick={toggleTheme}
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? '☀ Claro' : '☾ Oscuro'}
            </button>
          )}
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  );
};
