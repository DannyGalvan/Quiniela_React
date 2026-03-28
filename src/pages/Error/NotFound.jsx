import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVERPATH } from '../../config/configuracion';
import Loading from '../Loading/Loading';

const NotFound = (props) => {
  const { Numero, Mensaje, Autorized } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (Autorized) {
          await new Promise((resolve) => setTimeout(resolve, 2500));
          const autorized = getStogare("@rafc");
          const history = getStogare("route");
          autorized ? navigate(history) : null;
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate(`${SERVERPATH}/expired`);
      }
    })();
  }, []);

  return !loading ? (
    <div className="error-page">
      <div className="text-center px-3">
        <div className="error-code">{Numero}</div>
        <p className="error-message">{Mensaje}</p>
        <Link to={`/`} className="btn-wc-primary" style={{ display: 'inline-block', width: 'auto', padding: '0.65rem 2rem' }}>
          ← Regresar al Inicio
        </Link>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default NotFound;
