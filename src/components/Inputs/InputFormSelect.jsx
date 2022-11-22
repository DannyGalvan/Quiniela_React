import React from "react";
import { Form, Col} from "react-bootstrap";

export const InputFormSelect = ({data,size,error,value,referencia,name,onChange,onBlur}) => {
  return (
    <Col className="mb-3">
      <Form.Select aria-label="Default select example" 
      name={name}
      size={size}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onClick={onChange}
      ref={referencia}
      isValid={error ? false : true}
      isInvalid={error ? true : false}
      required>
        <option value="">Selecciona tu pais...</option>
        {data.length != 0 && data.map(d=><option key={d.id} value={d.id}>{d.nombre}</option>)}
      </Form.Select>
      <Form.Text className="text-danger fw-bold">{error}</Form.Text>
    </Col>
  );
};
