import React from 'react'
import {Spinner} from 'react-bootstrap';

export const LoadingComponent = (props) => {
    const {variant} = props;
  return (
    <div className="col-md-12 text-center py-3">
        <Spinner animation="grow" variant={variant} />
        <Spinner animation="grow" variant={variant} />
        <Spinner animation="grow" variant={variant} />
        <Spinner animation="grow" variant={variant} />
        <Spinner animation="grow" variant={variant} />
    </div>
  )
}