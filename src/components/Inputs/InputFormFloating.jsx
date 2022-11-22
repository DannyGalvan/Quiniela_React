import React from 'react'
import { Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export const InputFormFloating = (props) => {
    const {label,type,placeholder,name,onBlur,onChange,value,error,id,referencia, className, pattern} = props;
  return (
    <>
       <Col className={className ?? 'mb-3'}>
            <FloatingLabel
            controlId={id}
            label={label}
            >
                <Form.Control 
                type={type} 
                placeholder={placeholder}
                name={name}
                onBlur={onBlur}
                onChange={onChange}
                onKeyUp={onChange}
                value={value} 
                ref={referencia}
                isValid={error ? false : true}
                isInvalid={error ? true : false}
                pattern={pattern}
                required />
            </FloatingLabel>
            <Form.Text className='text-danger fw-bold'>{error}</Form.Text>
       </Col>
    </>
  )
}