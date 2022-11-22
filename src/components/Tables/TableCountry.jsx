import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import DataTable from "react-data-table-component";
import { Container } from "react-bootstrap";
import { LoadingComponent } from "../SpinerCarga/LoadingComponent";
import { MesajeNoData } from "../Mesages/MesajeNoData";
import { CardUser } from "../Cards/CardUser";
import { InputFormFloating } from "../Inputs/InputFormFloating";
import { seleccionMensaje } from "../../config/configuracion";
import { paginacionOpciones } from "../../config/configuracion";
import { compactGrid } from "../../theme/tableTheme";
import { apiCountryUsers } from "../../api/apiUsers";

const columnas = [
  {
    name: "Pocición",
    selector: (row) => row.pocicion,
    sortable: false,
    maxWidth: "90px",
    minWidth: "70px",
    center: true,
    style: {
      color: "#FDD835",
      fontWeight: "bold",
    },
  },
  {
    name: "Nombre",
    selector: (row) => row.nombre,
    wrap: true,
    sortable: true,
  },
  {
    name: "DPI",
    selector: (row) => `${row.dpi.substring(0, 5)}...3325120101...`,
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
    style: {
      color: "red",
      fontWeight: "bold",
    },
  },
];

export const TableCountry = ({ idCountry, width, title }) => {
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await apiCountryUsers(idCountry);
      if (response.data) {
        const pociciones = response.data.map((x, inx) => {
          return {
            ...x,
            pocicion: inx + 1,
          };
        });
        setUsers(pociciones);
      }
      setPending(false);
    })();
  }, []);

  const onChangeText = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const dataFiltered = useMemo(
    () =>
      users.filter((user) => {
        return user.nombre.toLowerCase().includes(search.toLowerCase().trim());
      }),
    [users, search]
  );

  const ExpandedComponent = ({ data }) => (
    <div className="d-flex justify-content-center">
      <CardUser data={data} variant={"primary"} />
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
        title={`${title}`}
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
          <MesajeNoData
            mesaje={
              search
                ? `No se encontraros usuarios con ${search}`
                : "Aun no hay Usuarios registrados"
            }
          />
        }
        customStyles={compactGrid}
      />
    </Container>
  );
};

