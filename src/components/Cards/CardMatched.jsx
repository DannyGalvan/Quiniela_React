import React, { useContext } from "react";
import { Form, Card, Row, Col, Image, Button } from "react-bootstrap";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../hooks/useForm";
import { apiPostPartidos } from "../../api/apiPartidos";
import { Toast } from "../Swal/Toast";
import Moment from "react-moment";

const logoImage = require.context("../../Banderas", true);

const initialForm = {
  idPartido: "",
  idUsuario: "",
  golesEquipo1: "",
  golesEquipo2: "",
};

const validate = (form)=>{
  const errors = {

  }

  if (form.golesEquipo1 < 0) {
    form.golesEquipo1 = 0;
  }
  if (form.golesEquipo2 < 0) {
    form.golesEquipo2 = 0;
  }

  return errors
}

export const CardMatched = ({ data,actualiza }) => {
  const { authState } = useContext(AuthContext);

  initialForm.idUsuario = authState.user;

  const enviarDatos = async (form) => {
    const result = await apiPostPartidos(form);
    if (result.exito) {
      Toast.fire({
        icon: "success",
        title: `${result.mensaje}`,
      });
      actualiza(form.idPartido,form.golesEquipo1,form.golesEquipo2);
    }else{
      Toast.fire({
        icon: "error",
        title: `${result.mensaje}`,
      });
    }    
  };

  const { form, handleChange, handleSubmit } = useForm(
    initialForm,
    validate,
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
              value={(form.idPartido = data.idPartido)}
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
                  placeholder={data.golesEquipo1}
                  onChange={handleChange}
                  type="number"
                  disabled={disabled}
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
                  placeholder={data.golesEquipo2}
                  onChange={handleChange}
                  type="number"
                  disabled={disabled}
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
              disabled={disabled}
            >
              {data.golesEquipo1 != '--' ? "Modificar Datos" : "Guardar Datos"}
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
};
