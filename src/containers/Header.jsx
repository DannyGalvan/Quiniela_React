import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../redux/state/user";
import { Menu } from "../components/Menu/Menu";
import { AuthContext } from "../context/authContext";
import { SERVERPATH } from "../config/configuracion";

const logoImage = require.context("../Banderas", true);

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout, authState } = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const cerrarSesion = () => {
    dispatch(resetUser());
    logout();
    navigate(`${SERVERPATH}/login`);
  };

  return (
    <Navbar
      key={"md"}
      style={{ background: "#48823F" }}
      variant="dark"
      expand={"md"}
    >
      <Container fluid>
        <Link to={`${SERVERPATH}`} className="text-light d-flex navbar-brand">
          <img
            alt="Logo"
            src={`${logoImage(`./LogoMundial.webp`)}`}
            width="60"
            height="60"
            className="d-inline-block align-top rounded-circle"
          />{" "}
          <span className="mt-3 ms-3 fw-bold">Mundial Qatar 2022</span>
        </Link>
        {authState.isLoggedIn && (
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-md`}
            onClick={handleShow}
          />
        )}
        {authState.isLoggedIn && (
          <Menu
            cerrarSesion={cerrarSesion}
            isAdmin={authState.isAdmin}
            show={show}
            handleClose={handleClose}
          />
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
