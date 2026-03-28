import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/state/user";
import { AuthContext } from "../context/authContext";
import { ThemeContext } from "../context/themeContext";
import { createImageLoader } from "../utils/imageLoader";

const logoImage = createImageLoader('../Banderas');

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout, authState } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const cerrarSesion = () => {
    dispatch(resetUser());
    logout();
    navigate(`/login`);
  };

  return (
    <Navbar className="navbar-wc" variant="dark" expand="md">
      <Container fluid className="px-3">

        {/* Brand */}
        <Link to={``} className="navbar-brand-wc">
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

              <Link to={``} className="nav-link">
                🏠 Inicio
              </Link>

              {/* Mi Quiniela — todos los usuarios */}
              <NavDropdown
                title="⚽ Mi Quiniela"
                id="dropdown-quiniela"
                align={{ md: "end" }}
              >
                <NavDropdown.Header>Fase de Grupos</NavDropdown.Header>
                <Link className="dropdown-item" to={`/post-group`}>
                  Llenar Predicciones por Grupo
                </Link>
                <Link className="dropdown-item" to={`/matches`}>
                  Ver Todos los Partidos de Grupos
                </Link>

                <NavDropdown.Divider />

                <NavDropdown.Header>Eliminatorias</NavDropdown.Header>
                <Link className="dropdown-item" to={`/post-finales`}>
                  Llenar Predicciones Eliminatorias
                </Link>

                <NavDropdown.Divider />

                <Link className="dropdown-item" to={`/instructions`}>
                  📖 Instrucciones
                </Link>
              </NavDropdown>

              {/* Resultados — todos los usuarios */}
              <NavDropdown
                title="📊 Resultados"
                id="dropdown-resultados"
                align={{ md: "end" }}
              >
                {/* Fase de grupos */}
                <NavDropdown.Header>Fase de Grupos</NavDropdown.Header>
                <Link className="dropdown-item" to={`/my-info`}>
                  Mis Predicciones por Grupo
                </Link>
                <Link className="dropdown-item" to={`/comparation-group`}>
                  Comparación por Grupo
                </Link>
                <Link className="dropdown-item" to={`/table-result`}>
                  Tabla de Clasificación Grupos
                </Link>

                <NavDropdown.Divider />

                {/* Fases eliminatorias */}
                <NavDropdown.Header>Eliminatorias</NavDropdown.Header>
                <Link className="dropdown-item" to={`/my-info-finales`}>
                  Mis Predicciones por Fase
                </Link>
                <Link className="dropdown-item" to={`/comparation-finales`}>
                  Comparación por Fase
                </Link>
                <Link className="dropdown-item" to={`/table-result-finales`}>
                  Tabla de Clasificación Eliminatorias
                </Link>

                <NavDropdown.Divider />

                {/* Generales */}
                <NavDropdown.Header>General</NavDropdown.Header>
                <Link className="dropdown-item" to={`/my-result`}>
                  Todos Mis Resultados
                </Link>
                <Link className="dropdown-item" to={`/comparation`}>
                  Comparación Todos
                </Link>
              </NavDropdown>

              {/* Administración — solo admin */}
              {authState.isAdmin && (
                <NavDropdown
                  title="⚙️ Administración"
                  id="dropdown-admin"
                  align={{ md: "end" }}
                >
                  <Link className="dropdown-item" to={`/results`}>
                    Ingresar Resultado Grupos
                  </Link>
                  <Link className="dropdown-item" to={`/results-finales`}>
                    Ingresar Resultado Finales
                  </Link>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item" to={`/mantenimiento-partidos`}>
                    Mantenimiento Partidos
                  </Link>
                  <Link className="dropdown-item" to={`/mantenimiento-finales`}>
                    Mantenimiento Finales
                  </Link>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item" to={`/table-result-country`}>
                    Clasificación Países — Grupos
                  </Link>
                  <Link className="dropdown-item" to={`/table-result-country-finales`}>
                    Clasificación Países — Eliminatorias
                  </Link>
                </NavDropdown>
              )}

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
