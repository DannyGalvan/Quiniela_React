import React,{useEffect} from "react";
import { Form, Card, Row, Col, Image, Button } from "react-bootstrap";
import Moment from "react-moment";
import { useForm } from "../../hooks/useForm";
import { Toast } from "../Swal/Toast";
import { apiPutPartidos } from "../../api/apiPartidos";

const logoImage = require.context("../../Banderas", true);

const initialForm = {
  idPartido: "",
  golesEquipo1: "",
  golesEquipo2: "",
};

export const CardResult = ({ data, func, isAdmin }) => {
 console.log(isAdmin)
  const enviarDatos = async (form) => {
    const response = await apiPutPartidos(form);
    if (response.mensaje) {
      Toast.fire({
        icon: "success",
        title: `${response.mensaje}`,
      });
      func(prev => !prev);
    }
  };

  const { form, handleChange, handleSubmit } = useForm(
    initialForm,
    null,
    enviarDatos
  );

  const now = new Date();
  const match = new Date(data.fechaPartido);
  const disabled = now > match;

  return (
    <Form onSubmit={handleSubmit}>
      <Card className="bg-card">
        <Card.Body>
          <Card.Title className="text-center fw-bold">
            Partido del{" "}
            <Moment date={new Date(data.fechaPartido)} format="DD/MM/YYYY" />{" "}
            Grupo {data.grupoEquipo1}
          </Card.Title>
          <Row>
            <input
              className="input-gol"
              name={`idPartido`}
              value={(form.idPartido = data.id)}
              type="hidden"
              required
            />
          </Row>
          <Row>
            <Col xs={"6"}>
              <Image src={logoImage(`./${data.imagenEquipo1}`)} />{" "}
              <span className="fw-bold">{data.nombreEquipo1}</span>
            </Col>
            <Col xs={"6"} className="mt-2 d-flex justify-content-center">
              <div className="fw-bold">
                <strong className="me-3">Goles: </strong>
                <input
                  className="input-gol"
                  name={`golesEquipo1`}
                  value={form.golesEquipo1}
                  onChange={handleChange}
                  type="number"
                  disabled={isAdmin ?? disabled}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={"6"}>
              <Image src={logoImage(`./${data.imagenEquipo2}`)} />
              <span className="fw-bold">{data.nombreEquipo2}</span>
            </Col>
            <Col xs={"6"} className="mt-2 d-flex justify-content-center">
              <div className="fw-bold">
                <strong className="me-3">Goles: </strong>
                <input
                  className="input-gol"
                  name={`golesEquipo2`}
                  value={form.golesEquipo2}
                  onChange={handleChange}
                  type="number"
                  disabled={isAdmin ?? disabled}
                  required
                />
              </div>
            </Col>
          </Row>
          <Row className="pt-3 px-2">
            <Button
              variant="primary"
              type="submit"
              style={{ background: "#48823F", borderColor: "white" }}
              disabled={isAdmin ?? disabled}
            >
              Guardar Datos
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};
