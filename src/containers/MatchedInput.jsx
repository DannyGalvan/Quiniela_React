import React, { useMemo } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { CardInput } from "../components/Cards/CardInput";
import { useForm } from "../hooks/useForm";
import { apiPostPartidos } from "../api/apiPartidos";

const initialForm = {
  IdUsuario: 0,
  IdPartido0: "", GolesP0: "", GolesS0: "",
  IdPartido1: "", GolesP1: "", GolesS1: "",
  IdPartido2: "", GolesP2: "", GolesS2: "",
  IdPartido3: "", GolesP3: "", GolesS3: "",
  IdPartido4: "", GolesP4: "", GolesS4: "",
  IdPartido5: "", GolesP5: "", GolesS5: "",
};

export const MatchedInput = ({ list, idUsuario, change, xs, md, lg, xl, xxl }) => {
  initialForm.IdUsuario = idUsuario;

  const enviarDatos = useMemo(
    () => async (form) => {
      const array = [];
      const largo = Object.keys(form).length / 3;
      for (let i = 0; i < largo - 1; i++) {
        array.push({
          idUsuario: form["IdUsuario"],
          idPartido: form[`IdPartido${i}`],
          golesEquipo1: form[`GolesP${i}`],
          golesEquipo2: form[`GolesS${i}`],
        });
      }
      const response = await apiPostPartidos(array);
      if (response.exito != 0) change();
    },
    list
  );

  const desabilidato = useMemo(
    () => list.filter((e) => new Date() > new Date(e.fechaPartido)),
    list
  );

  const { form, handleChange, handleSubmit } = useForm(initialForm, null, enviarDatos);

  return (
    <Form onSubmit={handleSubmit}>
      <Row xs={xs} md={md} lg={lg} xl={xl} xxl={xxl} className="g-4">
        {list.map((partido, i) => (
          <Col key={partido.id}>
            <CardInput data={partido} id={i} form={form} handleChange={handleChange} />
          </Col>
        ))}
      </Row>
      <Row className="pt-3 px-2">
        <button
          className="btn-wc-primary"
          type="submit"
          disabled={desabilidato.length !== 0}
        >
          💾 Guardar Datos
        </button>
      </Row>
    </Form>
  );
};
