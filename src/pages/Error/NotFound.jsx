import React,{useState, useEffect} from 'react'
import Loading from '../Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { SERVERPATH } from '../../config/configuracion';

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
            setLoading(false);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          navigate(`${SERVERPATH}/expired`);
        }
      })();
    }, []);
  
    return !loading ? (
      <div className="page-wrap d-flex flex-row align-items-center bg-container">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block">{Numero}</span>
              <div className="mb-4 lead fw-bold">{Mensaje}</div>
              <Link to={`${SERVERPATH}`} className="btn btn-link fw-bold">
                Regresar Al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );
}

export default NotFound
