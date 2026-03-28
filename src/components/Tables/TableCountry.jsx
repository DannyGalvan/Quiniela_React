import React, { useEffect, useState, useCallback, useRef, useMemo, useContext } from "react";
import DataTable from "react-data-table-component";
import { Container } from "react-bootstrap";
import { LoadingComponent } from "../SpinerCarga/LoadingComponent";
import { MesajeNoData } from "../Mesages/MesajeNoData";
import { CardUser } from "../Cards/CardUser";
import { InputFormFloating } from "../Inputs/InputFormFloating";
import { seleccionMensaje, paginacionOpciones } from "../../config/configuracion";
import { getTableStyles, getTableTheme, posicionStyle, punteoStyle } from "../../theme/tableTheme";
import { ThemeContext } from "../../context/themeContext";
import { apiCountryUsers } from "../../api/apiUsers";

export const TableCountry = ({ idCountry, width, title }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

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
      wrap: true,
      sortable: true,
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
      maxWidth: "90px",
      minWidth: "80px",
      center: true,
      hide: "sm",
      style: punteoStyle(isDark),
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await apiCountryUsers(idCountry);
      if (response.data) {
        const pociciones = response.data.map((x, inx) => ({ ...x, pocicion: inx + 1 }));
        setUsers(pociciones);
      }
      setPending(false);
    })();
  }, []);

  const onChangeText = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const dataFiltered = useMemo(
    () => users.filter((user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase().trim())
    ),
    [users, search]
  );

  const ExpandedComponent = ({ data }) => (
    <div className="d-flex justify-content-center py-3">
      <CardUser data={data} variant={isDark ? "dark" : "light"} />
    </div>
  );

  return (
    <Container fluid>
      <InputFormFloating
        label="Buscar Usuario"
        placeholder="Buscar..."
        referencia={searchInput}
        value={search}
        onChange={onChangeText}
        className="my-3"
      />
      <DataTable
        responsive
        contextMessage={seleccionMensaje}
        columns={columnas}
        data={dataFiltered}
        title={title}
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
          <MesajeNoData
            mesaje={search
              ? `No se encontraron usuarios con "${search}"`
              : "Aún no hay usuarios registrados"
            }
          />
        }
        customStyles={getTableStyles(isDark)}
      />
    </Container>
  );
};
