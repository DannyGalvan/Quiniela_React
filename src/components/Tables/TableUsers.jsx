import React, { useContext } from "react";
import DataTable from "react-data-table-component";
import { LoadingComponent } from "../SpinerCarga/LoadingComponent";
import { MesajeNoData } from "../Mesages/MesajeNoData";
import { CardUser } from "../Cards/CardUser";
import { seleccionMensaje, paginacionOpciones } from "../../config/configuracion";
import { getTableStyles, getTableTheme, posicionStyle, punteoStyle } from "../../theme/tableTheme";
import { ThemeContext } from "../../context/themeContext";

export const TableUsers = ({ data, pending, width, text }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const columnas = [
    {
      name: "Posición",
      selector: (row) => row.pocicion,
      sortable: false,
      maxWidth: "90px",
      minWidth: "70px",
      center: true,
      style: posicionStyle(isDark),
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
    },
    {
      name: "DPI",
      selector: (row) => `${row.dpi.substring(0, 5)}·····`,
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
      style: punteoStyle(isDark),
    },
  ];

  const ExpandedComponent = ({ data }) => (
    <div className="d-flex justify-content-center py-3">
      <CardUser data={data} variant={isDark ? "dark" : "light"} />
    </div>
  );

  return (
    <div className="container-fluid pb-5">
      <DataTable
        responsive
        contextMessage={seleccionMensaje}
        columns={columnas}
        data={data}
        title="🏆 Tabla de Posiciones"
        pagination
        expandableRows={width}
        fixedHeader
        fixedHeaderScrollHeight="500px"
        expandableRowsComponent={ExpandedComponent}
        paginationComponentOptions={paginacionOpciones}
        theme={getTableTheme(isDark)}
        highlightOnHover
        striped
        progressPending={pending}
        progressComponent={<LoadingComponent variant={isDark ? "light" : "primary"} />}
        noDataComponent={
          <MesajeNoData mesaje={`No se encontraron usuarios con "${text}"`} />
        }
        customStyles={getTableStyles(isDark)}
      />
    </div>
  );
};
