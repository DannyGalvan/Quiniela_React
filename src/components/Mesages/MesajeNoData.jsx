import React from 'react'

export const MesajeNoData = ({mesaje}) => {
  return (
    <div className='m-3'>
        <p className='fw-bold text-danger text-center'>{mesaje}</p>
    </div>
  )
}
