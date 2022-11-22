import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Container } from "react-bootstrap";
import { InputFormFloating } from "../components/Inputs/InputFormFloating";
import { apiUsuarios } from "../api/apiUsers";
import { TableUsers } from "../components/Tables/TableUsers";

const TableResults = () => {
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
      if (witd > 700) {
        setWidth(false);
      } else {
        setWidth(true);
      }
    };
    resScreenResize();
    window.addEventListener("resize", resScreenResize);

    const result = await apiUsuarios();
    if (result.data) {
      const pociciones = result.data.map((x,inx) => {
        return {
          ...x,
          pocicion: inx+1
        }
      });
      setUsers(pociciones);
    }
    setLoading(false);
  };

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

  return (
    <div className="bg-container page-wrap">
      <h1 className="text-center fw-bold pt-5">Tabla de resultados</h1>
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

export default TableResults;
