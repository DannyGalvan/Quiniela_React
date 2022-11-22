import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { Container } from "react-bootstrap";
import Loading from "./Loading/Loading";
import { apiComparationsUser } from "../api/apiPartidos";
import { ListComparacion } from "../containers/ListComparacion";
import { InputFormFloating } from "../components/Inputs/InputFormFloating";
import { AuthContext } from "../context/authContext";
import { useSearch } from "../hooks/useSearch";

const CompareResult = () => {
  const { authState } = useContext(AuthContext);
  const [compare, setCompare] = useState([]);
  const [loading, setLoading] = useState(true);
  const {search,searchInput,dataFiltered,onChangeText} = useSearch(compare);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await apiComparationsUser(authState.user);
    if (response.data) {
      setCompare(response.data);
    }
    setLoading(false);
  };

  return (
    <div className="page-wrap bg-container pt-3">
      <h1 className="text-center fw-bold">
        Comparacion de Resultados Mundial Qatar 2022
      </h1>
      {!loading ? (
        <Container className="pt-5">
          <InputFormFloating
            onChange={onChangeText}
            value={search}
            referencia={searchInput}
            placeholder="Buscar..."
            label="Buscador por Equipo..."
          />
          <ListComparacion xs={1} md={1} lg={1} list={dataFiltered} text={search} />
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CompareResult;
