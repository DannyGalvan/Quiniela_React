import React from "react";
import DataTable from "react-data-table-component";
import { LoadingComponent } from "../SpinerCarga/LoadingComponent";
import { MesajeNoData } from "../Mesages/MesajeNoData";
import { CardUser } from "../Cards/CardUser";
import { seleccionMensaje } from "../../config/configuracion";
import { paginacionOpciones } from "../../config/configuracion";
import { compactGrid } from "../../theme/tableTheme";

const columnas = [
  {
    name: "Pocición",
    selector: (row) => row.pocicion,
    sortable: false,
    maxWidth: "90px",
    minWidth: "70px",
    center: true,
    style: {
      color: '#FDD835',
      fontWeight: 'bold',
    },
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    sortable: true,
    wrap: true,
  },
  {
    name: "DPI",
    selector: (row) => `${row.dpi.substring(0,5)}...3325120101...`,
    sortable: true,
    hide: "md",
    wrap: true,
  },
  {
    name: "Punteo",
    selector: (row) => row.punteo,
    sortable: true,   
    maxWidth: "120px",
    minWidth: "100px",
    center: true,
    hide: "sm",
    style: {
      			color: 'red',
            fontWeight: 'bold',
      		},
  },
];

export const TableUsers = (props) => {
  const { data, pending, width, text } = props;

  const ExpandedComponent = ({ data }) => (
    <div className="d-flex justify-content-center">
      <CardUser data={data} variant={"primary"} />
    </div>
  );

  return (
    <div className="container-fluid pb-5">
      <DataTable
        responsive
        contextMessage={seleccionMensaje}
        columns={columnas}
        data={data}
        title="Tabla de Posiciones"
        pagination
        expandableRows={width}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        expandableRowsComponent={ExpandedComponent}
        paginationComponentOptions={paginacionOpciones}
        theme="individuality"
        highlightOnHover
        progressPending={pending}
        progressComponent={<LoadingComponent variant="light" />}
        noDataComponent={
          <MesajeNoData mesaje={`No se encontraros usuarios con ${text}`} />
        }
        customStyles={compactGrid}
      />
    </div>
  );
};
