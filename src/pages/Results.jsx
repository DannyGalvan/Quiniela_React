import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { InputSelectMatches } from "../components/Inputs/InputSelectMatches";
import { ListResult } from "../containers/ListResult";
import { MatchesList } from "../containers/MatchesList";
import { contextActions } from "../components/Swal/Toast";
import { MesajeNoData } from "../components/Mesages/MesajeNoData";
import { apiPartidos } from "../api/apiPartidos";

const Results = () => {
  const [matches, setMatches] = useState([]);
  const [select, setSelect] = useState("");
  const [change, setChange] = useState(true);
  const inputSelect = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await apiPartidos();
      if (response.data) {
        setMatches(response.data);
        setChange(false);
      }
    })();
  }, [change]);

  const onChange = useCallback(() => {
    setSelect(inputSelect.current.value);
  }, []);

  const matchedFiltered = useMemo(
    () => matches.filter((s) => s.id == select),
    [matches, select]
  );

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Ingreso de <span className="gradient-text">Resultados</span></h1>
        <p>Selecciona un partido para actualizar el marcador</p>
      </div>

      <Container fluid className="px-4 pb-5">
        <InputSelectMatches
          data={matches}
          size="lg"
          value={select}
          error={select}
          referencia={inputSelect}
          onChange={onChange}
        />

        {matchedFiltered.length > 0 ? (
          <>
            <Row className="g-4 mt-1">
              <Col xs={12} lg={6}>
                <p className="compare-label">Actualización de datos</p>
                <ListResult
                  isAdmin={false}
                  list={matchedFiltered}
                  func={setChange}
                />
              </Col>
              <Col xs={12} lg={6}>
                <p className="compare-label">Datos actuales</p>
                <MatchesList list={matchedFiltered} />
              </Col>
            </Row>

            <Row className="mt-4">
              <Col className="d-flex justify-content-center">
                <button
                  className="btn-wc-primary"
                  style={{ maxWidth: 280 }}
                  onClick={() => contextActions(select)}
                  type="button"
                >
                  ⚡ Calcular Resultados
                </button>
              </Col>
            </Row>
          </>
        ) : (
          <MesajeNoData mesaje="No has seleccionado ningún encuentro" />
        )}
      </Container>
    </div>
  );
};

export default Results;
