import React from "react";
import { Form } from "react-bootstrap";

export const InputFormSelect = ({ data, size, error, value, referencia, name, onChange, onBlur }) => {
  return (
    <div className="mb-3">
      <Form.Select
        aria-label="Selecciona tu país"
        name={name}
        size={size}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onChange}
        ref={referencia}
        isValid={false}
        isInvalid={!!error}
        required
      >
        <option value="">Selecciona tu país...</option>
        {data.length !== 0 && data.map(d => (
          <option key={d.id} value={d.id}>{d.nombre}</option>
        ))}
      </Form.Select>
      <Form.Text className="text-danger fw-bold">{error}</Form.Text>
    </div>
  );
};
