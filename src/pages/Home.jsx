import React, {
  useState,
  useEffect
} from "react";
import { Container } from "react-bootstrap";
import { apiPartidos } from "../api/apiPartidos";
import { MatchesList } from "../containers/MatchesList";
import { InputFormFloating } from "../components/Inputs/InputFormFloating";
import Loading from "./Loading/Loading";
import { useSearch } from "../hooks/useSearch";
import { InputDateDuo } from "../components/Inputs/InputDateDuo";

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    dataFiltered,
    onChangeText,
    search,
    searchInput,
    inicio,
    searchInicio,
    fin,
    searchFin,
    onChangeDateInicio,
    onChangeDateFin,
  } = useSearch(matches);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await apiPartidos();
    if (response.data) {
      setMatches(response.data);
    }
    setLoading(false);
  };

  return (
    <div className="bg-container page-wrap">
      <div className="page-hero">
        <h1>Partidos del <span className="gradient-text">Mundial 2026</span></h1>
        <p>USA · Canadá · México</p>
      </div>
      {!loading ? (
        <Container className="py-5">
          <InputFormFloating
            label="Buscador por Equipo..."
            placeholder="Buscador por Equipo"
            referencia={searchInput}
            value={search}
            onChange={onChangeText}
          />
          <InputDateDuo
            inicio={inicio}
            searchInicio={searchInicio}
            onChangeDateInicio={onChangeDateInicio}
            fin={fin}
            searchFin={searchFin}
            onChangeDateFin={onChangeDateFin}
          />
          <MatchesList
            list={dataFiltered}
            xs={1}
            md={1}
            lg={2}
            xxl={3}
            text={search}
          />
        </Container>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
