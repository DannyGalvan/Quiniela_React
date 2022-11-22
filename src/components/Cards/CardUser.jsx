import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';

export const CardUser = (props) => {
    const { variant, title, content, style, data } = props;
    const tamanio = data ? "18rem" : "22rem";
    return (
      <Card
        bg={variant}
        key={variant}
        text={!style && (variant === "light" ? "dark" : "white")}
        style={{ width: tamanio, ...style }}
        className="mb-2"
      >
        <Card.Header>{title ?? "Datos Usuario"}</Card.Header>
        <Card.Body>
          <Card.Text className="text-center">{content}</Card.Text>
          {data &&
            <ListGroup variant="flush">
                <ListGroup.Item variant="primary">
                    Id: {data.id}                 
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                    Pocición: {data.pocicion}                 
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                    Nombre: {data.nombre}                 
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                    DPI: {`${data.dpi.substring(0,5)}...3325120101...`}              
                </ListGroup.Item>
                <ListGroup.Item variant="primary">
                    Punteo: <strong className='fw-bold text-danger'>{data.punteo}</strong>                 
                </ListGroup.Item>
            </ListGroup>
          }
        </Card.Body>
      </Card>
    );
}

