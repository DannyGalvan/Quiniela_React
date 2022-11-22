import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { InputFormFloating } from "../../components/Inputs/InputFormFloating";
import { InputFormSelect } from "../../components/Inputs/InputFormSelect";
import { apiNewUser } from "../../api/apiLogin";
import { apiPaises } from "../../api/apiPaises";
import { SERVERPATH } from "../../config/configuracion";

const logoImage = require.context("../../Banderas", true);

const initialForm = {
  nombre: "",
  dpi: "",
  pais: "",
};

const validationsForm = (form) => {
  let errors = {};

  if (!form.pais.trim()) {
    errors.pais = "Debes seleccionar un 'pais'";
  }

  if (!form.nombre.trim()) {
    errors.nombre = "No puedes dejar tu 'nombre' vacio";
  }

  if (!form.dpi.trim()) {
    errors.dpi = "Tu 'CUI' es obligatorio para participar";
  } else if (form.pais == 1 && form.dpi.length < 13) {
    errors.dpi = "Tu 'CUI' debe tener minimo 13 caracteres";
  }if (form.pais == 2 && form.dpi.length < 9) {
    errors.dpi = "Tu 'CUI' debe tener minimo 9 caracteres";
  }else if ((form.pais != 1 && form.pais != 2) && form.dpi.length < 5) {
    errors.dpi = "Tu 'CUI' debe tener minimo 5 caracteres";
  }

  return errors;
};

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await apiPaises();
      if (response.data) {
        setPaises(response.data);
      }
    })();
  }, []);

  const enviar = async (form) => {
    const res = await apiNewUser(form);
    if (res.exito != 0) {
      signIn(res.data);
      navigate(`${SERVERPATH}`);
    }
    return res;
  };

  const { form, errors, response, handleBlur, handleChange, handleSubmit } =
    useForm(initialForm, validationsForm, enviar);

  return (
    <div className="page-wrap bg-container d-flex align-items-center">
      <Container className="pt-5">
        <Row className="justify-content-center">
          <Col xs="8" md="6" lg="6" className="mb-4">
            <Image
              fluid
              src={logoImage(`./LOGO.png`)}              
            />
          </Col>
          <Col xs="12" md="10" lg="6" className="my-auto mx-auto">
            <form onSubmit={handleSubmit}>
              <InputFormSelect
                data={paises}
                name={"pais"}
                size={"lg"}
                value={form.pais}
                error={errors.pais}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <InputFormFloating
                label="Ingresa tu Nombre"
                name="nombre"
                error={errors.nombre}
                type="text"
                placeholder="nombre..."
                value={form.nombre}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <InputFormFloating
                label="CUI"
                name="dpi"
                error={errors.dpi}
                type="number"
                placeholder="dpi..."
                value={form.dpi}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-between mx-4 my-4">
                <Form.Check
                  type="checkbox"
                  id={`default-checkbox`}
                  label={`Recuerdame`}
                />
              </div>

              <div className="d-grid gap-2 mb-4">
                <Button variant="primary" size="lg" type="submit">
                  Crear Usuario
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Link to={`${SERVERPATH}/login`}  className="text-center">
                  Ya Tienes Usuario?
                </Link>
              </div>
              {response && (
                <Alert variant="danger">
                  <Alert.Heading className="text-center text-danger fw-bold">
                    {response.mensaje}
                  </Alert.Heading>
                </Alert>
              )}
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
