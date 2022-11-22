import React from "react";
import { Form, Col } from "react-bootstrap";
import moment from "moment";

export const InputSelectMatches = ({
  data,
  size,
  error,
  value,
  referencia,
  name,
  onChange,
  onBlur,
}) => {
  return (
    <Col className="mb-3 mt-5">
      <Form.Select
        aria-label="Default select example"
        name={name}
        size={size}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onChange}
        ref={referencia}
        isValid={value != 0 ? false : true}
        isInvalid={value == 0 ? true : false}
        required
      >
        <option value="">Selecciona el partido...</option>
        {data.length != 0 &&
          data.map((d) => (
            <option className="text-primary" key={d.id} value={d.id}>
              {d.nombreEquipo1} - {d.nombreEquipo2} - fecha:{" "}
              {moment(new Date(d.fechaPartido)).format("DD/MM/YYYY")} - Grupo:{" "}
              {d.grupoEquipo1}
            </option>
          ))}
      </Form.Select>
      <Form.Text className="text-danger fw-bold">
        {value == 0 && "Debes de seleccionar un encuentro"}
      </Form.Text>
    </Col>
  );
};
