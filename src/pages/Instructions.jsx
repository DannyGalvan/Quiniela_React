import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SERVERPATH } from '../config/configuracion'

const Instructions = () => {
  return (
    <Container fluid className='bg-container page-wrap'>
      <h1 className='text-center fw-bold py-3'>Instrucciones</h1>
      <h3>Reglas del Juego</h3>
      <ul>
        <li>Debes ingresar los resultados del partido mínimo un día antes del juego</li>
        <li>Los resultados puedes ingresarlos en el apartado <Link to={`${SERVERPATH}/post-group`}>Por Grupos</Link> y <Link to={`${SERVERPATH}/matches`}>Todos los Partidos</Link> </li>
        <li>Para ingresar los resultados y guardarlos debes llenar las casillas y luego click en el botón 'Guardar Datos' o 'Actualizar Datos' según sea el caso</li>
        <li>Podrá visualizar sus resultados ingresados en los apartados <Link to={`${SERVERPATH}/my-info`}>Mis Resultados Por Grupo</Link> y <Link to={`${SERVERPATH}/my-result`}>Todos mis resultados</Link></li>
        <li>Podrá visualizar la ponderación obtenida en los apartados <Link to={`${SERVERPATH}/comparation-group`}>Comparación Grupos</Link> y <Link to={`${SERVERPATH}/comparation`}>Comparación Todos</Link></li>
        <li>Sus resultados los podrá modificar cuantas veces sea necesario mientras estemos en la fecha anterior al juego</li>
        <li>Una vez se llege la fecha del juego no se pódra modificar ni dar ingreso a sus resultados</li>
        <li>La tabla de clasificaciones la pódra ver en el apartado <Link to={`${SERVERPATH}/table-result`}>Tabla de Clasificaciones</Link></li>
        <li>El ganador de la quiniela séra el que obtenga más puntos al final</li>
      </ul>
      <h3>Punteos</h3>
      <ul>
        <li>Se obtendrá una ponderación de 3 puntos si acierta al final tanto ganador como resultado</li>
        <li>Se obtendrá una ponderación de 1 puntos si acierta al final el ganador del encuentro</li>
        <li>Se obtendrá una ponderación de 0 puntos si no acierta ninguno de los puntos anteriores</li>
      </ul>
    </Container>
  )
}

export default Instructions
