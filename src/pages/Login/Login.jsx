import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createUser, modifyUser, resetUser } from "../../redux/state/user";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { InputFormFloating } from "../../components/Inputs/InputFormFloating";
import { apiLogin } from "../../api/apiLogin";
import { SERVERPATH } from "../../config/configuracion";

const logoImage = require.context("../../Banderas", true);

const initialForm = {
  dpi: "",
};

const validationsForm = (form) => {
  let errors = {};

  if (!form.dpi.trim()) {
    errors.dpi = "Tu 'CUI' no puede ser vacio";
  } else if (form.dpi.length < 5) {
    errors.dpi = "Tu 'CUI' debe tener minimo 5 caracteres";
  }

  return errors;
};

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const userState = useSelector((store)=>store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enviar = async (form) => {
    const res = await apiLogin(form);
    if (res.exito != 0) {
      signIn(res.data);
      dispatch(createUser(res.data));
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
            <Image fluid src={logoImage(`./LOGO.png`)} />
          </Col>
          <Col xs="12" md="10" lg="6" className="my-auto mx-auto">
            <form onSubmit={handleSubmit}>
              <InputFormFloating
                label="CUI"
                name="dpi"
                error={errors.dpi}
                type="number"
                placeholder="dpi..."
                value={form.dpi}
                onBlur={handleBlur}
                onChange={handleChange}
                pattern={"/^[0-9]{4}\\s?[0-9]{5}\\s?[0-9]{4}$/"}
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
                  Iniciar Sesion
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Link to={`${SERVERPATH}/new_user`} className="text-center">
                  Crear Usuario
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
