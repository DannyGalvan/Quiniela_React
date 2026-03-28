import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/state/user";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";
import { SERVERPATH } from "../config/configuracion";

const logoImage = require.context("../Banderas", true);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout, authState } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cerrarSesion = () => {
    dispatch(resetUser());
    logout();
    navigate(`${SERVERPATH}/login`);
  };

  return (
    <Navbar className="navbar-wc" variant="dark" expand="md">
      <Container fluid className="px-3">

        {/* Brand */}
        <Link to={`${SERVERPATH}`} className="navbar-brand-wc">
          <img
            alt="Logo Mundial 2026"
            src={`${logoImage(`./LogoMundial.webp`)}`}
            width="48"
            height="48"
          />
          <div className="brand-text">
            <span className="brand-name">Quiniela Mundial</span>
            <span className="brand-year">USA · Canada · Mexico 2026</span>
          </div>
        </Link>

        {/* Hamburger — visible solo en mobile (Bootstrap lo oculta en md+) */}
        {authState.isLoggedIn && (
          <Navbar.Toggle aria-controls="main-navbar-collapse" />
        )}

        {/* Collapse — inline en desktop, desplegable en mobile */}
        {authState.isLoggedIn && (
          <Navbar.Collapse id="main-navbar-collapse">
            <Nav className="ms-auto align-items-md-center gap-md-1">

              <Link to={`${SERVERPATH}`} className="nav-link">
                🏠 Inicio
              </Link>

              <NavDropdown
                title="📊 Resultados"
                id="dropdown-resultados"
                align={{ md: "end" }}
              >
                {authState.isAdmin && (
                  <Link
                    className="dropdown-item"
                    to={`${SERVERPATH}/table-result-country`}
                  >
                    Clasificación Todos los Países
                  </Link>
                )}
                <Link className="dropdown-item" to={`${SERVERPATH}/my-info`}>
                  Mis Resultados Por Grupos
                </Link>
                <Link className="dropdown-item" to={`${SERVERPATH}/comparation-group`}>
                  Comparación Grupos
                </Link>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to={`${SERVERPATH}/my-result`}>
                  Todos Mis Resultados
                </Link>
                <Link className="dropdown-item" to={`${SERVERPATH}/comparation`}>
                  Comparación Todos
                </Link>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to={`${SERVERPATH}/table-result`}>
                  Tabla de Clasificación
                </Link>
              </NavDropdown>

              <NavDropdown
                title="⚽ Llenar Quiniela"
                id="dropdown-quiniela"
                align={{ md: "end" }}
              >
                {authState.isAdmin && (
                  <Link className="dropdown-item" to={`${SERVERPATH}/results`}>
                    Ingresar Resultado
                  </Link>
                )}
                {authState.isAdmin && (
                  <Link className="dropdown-item" to={`${SERVERPATH}/mantenimiento-partidos`}>
                    Mantenimiento Partidos
                  </Link>
                )}
                <Link className="dropdown-item" to={`${SERVERPATH}/instructions`}>
                  Instrucciones
                </Link>
                <Link className="dropdown-item" to={`${SERVERPATH}/post-group`}>
                  Por Grupos
                </Link>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to={`${SERVERPATH}/matches`}>
                  Todos Los Partidos
                </Link>
              </NavDropdown>

              <Nav.Link onClick={cerrarSesion}>
                🚪 Cerrar Sesión
              </Nav.Link>

              {/* Toggle tema */}
              <button
                className="btn-theme-toggle ms-md-2 mt-2 mt-md-0"
                onClick={toggleTheme}
                aria-label="Cambiar tema"
              >
                {theme === 'dark' ? '☀ Claro' : '☾ Oscuro'}
              </button>

            </Nav>
          </Navbar.Collapse>
        )}

      </Container>
    </Navbar>
  );
};

export default Header;
