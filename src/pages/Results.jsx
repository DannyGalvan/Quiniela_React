import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
    () =>
      matches.filter((s) => {
        return s.id == select;
      }),
    [matches, select]
  );

  return (
    <Container fluid className="page-wrap bg-container px-5">
      <h1 className="fw-bold text-center pt-3">
        Ingreso y Calculo de Resultados Por Partido
      </h1>
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
          <Col className="my-3">
            <p>Actualizacion de datos</p>
            <ListResult
              isAdmin={false}
              list={matchedFiltered}
              func={setChange}
            />
          </Col>
          <Col>
            <p>Datos actuales</p>
            <MatchesList
              list={matchedFiltered}
            />
          </Col>
        </>
      ) : (<MesajeNoData mesaje={"No has Seleccionado ningun encuentro"}/>)}
      <Row className="mt-3 pb-5">
        <Col className="d-flex justify-content-center">
          {matchedFiltered.length != 0 && (
            <Button 
            onClick={() => contextActions(select)}
            style={{ background: "#48823F", borderColor: "white" }}>
              Calcular Resultados
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Results;
