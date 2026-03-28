import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/state/user";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { InputFormFloating } from "../../components/Inputs/InputFormFloating";
import { apiLogin } from "../../api/apiLogin";
import { SERVERPATH } from "../../config/configuracion";
import { createImageLoader } from "../../utils/imageLoader";

const logoImage = createImageLoader("../../Banderas");

const initialForm = { dpi: "" };

const validationsForm = (form) => {
  let errors = {};
  if (!form.dpi.trim()) {
    errors.dpi = "Tu 'CUI' no puede ser vacío";
  } else if (form.dpi.length < 5) {
    errors.dpi = "Tu 'CUI' debe tener mínimo 5 caracteres";
  }
  return errors;
};

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enviar = async (form) => {
    const res = await apiLogin(form);
    if (res.exito != 0) {
      signIn(res.data);
      dispatch(createUser(res.data));
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
        <h1 className="login-title">Bienvenido</h1>
        <p className="login-subtitle">Mundial USA · Canada · Mexico 2026</p>

        <form onSubmit={handleSubmit}>
          <InputFormFloating
            label="CUI / DPI"
            name="dpi"
            error={errors.dpi}
            type="number"
            placeholder="Ingresa tu CUI..."
            value={form.dpi}
            onBlur={handleBlur}
            onChange={handleChange}
            pattern={"/^[0-9]{4}\\s?[0-9]{5}\\s?[0-9]{4}$/"}
          />

          <div className="d-flex align-items-center mx-1 my-3">
            <Form.Check
              type="checkbox"
              id="remember-me"
              label="Recuérdame"
              style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}
            />
          </div>

          <div className="d-grid mb-3">
            <button className="btn-wc-primary" type="submit">
              Iniciar Sesión →
            </button>
          </div>

          <div className="text-center">
            <Link
              to={`/new_user`}
              style={{
                color: 'var(--brand-accent)',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              ¿No tienes cuenta? Crear usuario
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
