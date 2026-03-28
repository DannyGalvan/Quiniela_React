import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { InputFormFloating } from "../../components/Inputs/InputFormFloating";
import { InputFormSelect } from "../../components/Inputs/InputFormSelect";
import { apiNewUser } from "../../api/apiLogin";
import { apiPaises } from "../../api/apiPaises";
import { SERVERPATH } from "../../config/configuracion";
import { createImageLoader } from "../../utils/imageLoader";

const logoImage = createImageLoader('../../Banderas');

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
      navigate(`/`);
    }
    return res;
  };

  const { form, errors, response, handleBlur, handleChange, handleSubmit } =
    useForm(initialForm, validationsForm, enviar);

  return (
    <div className="login-page">
      <div className="login-card">
        <img
          className="login-logo"
          src={logoImage(`./LOGO.png`)}
          alt="Logo Mundial 2026"
        />
        <h1 className="login-title">Crear Cuenta</h1>
        <p className="login-subtitle">Mundial USA · Canada · Mexico 2026</p>

        <form onSubmit={handleSubmit}>
          <InputFormSelect
            data={paises}
            name={"pais"}
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

          <div className="d-flex align-items-center mx-1 my-3">
            <Form.Check
              type="checkbox"
              id="remember-me-new"
              label="Recuérdame"
              style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn-wc-primary" type="submit">
              Crear Usuario →
            </button>
          </div>

          <div className="text-center">
            <Link
              to={`/login`}
              style={{
                color: 'var(--brand-accent)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              ¿Ya tienes cuenta? Iniciar sesión
            </Link>
          </div>

          {response && (
            <Alert variant="danger" className="mt-3 mb-0">
              <Alert.Heading className="text-center fs-6 mb-0 fw-bold">
                {response.mensaje}
              </Alert.Heading>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
