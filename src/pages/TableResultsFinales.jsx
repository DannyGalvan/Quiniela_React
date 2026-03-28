import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Container } from "react-bootstrap";
import { InputFormFloating } from "../components/Inputs/InputFormFloating";
import { apiUsuariosFinales } from "../api/apiUsers";
import { TableUsers } from "../components/Tables/TableUsers";

const TableResultsFinales = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(false);
  const [search, setSearch] = useState("");
  const searchInput = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resScreenResize = () => {
      const witd = document.querySelector("body").clientWidth;
      setWidth(witd <= 700);
    };
    resScreenResize();
    window.addEventListener("resize", resScreenResize);

    const result = await apiUsuariosFinales();
    if (result?.data) {
      const posiciones = result.data.map((x, inx) => ({ ...x, pocicion: inx + 1 }));
      setUsers(posiciones);
    }
    setLoading(false);
  };

  const onChangeText = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const dataFiltered = useMemo(
    () => users.filter((user) =>
      user.nombre.toLowerCase().includes(search.toLowerCase().trim())
    ),
    [users, search]
  );

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Tabla de <span className="gradient-text">Eliminatorias</span></h1>
        <p>Mundial 2026 — USA · Canadá · México</p>
      </div>
      <Container className="mt-3" fluid>
        <InputFormFloating
          label="Buscar Usuario"
          placeholder="Buscar..."
          referencia={searchInput}
          value={search}
          onChange={onChangeText}
          className="m-3"
        />
        <TableUsers
          data={dataFiltered}
          text={search}
          width={width}
          pending={loading}
        />
      </Container>
    </div>
  );
};

export default TableResultsFinales;
