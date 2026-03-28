import { useState, useEffect } from "react";
import { apiTodosUser } from "../api/apiPartidos";

const GRUPOS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

const agrupar = (data) =>
  GRUPOS.reduce((acc, g) => {
    acc[g] = data.filter((m) => m.grupoEquipo1 === g);
    return acc;
  }, {});

const estadoInicial = () =>
  GRUPOS.reduce((acc, g) => {
    acc[g] = { matches: [], list: [] };
    return acc;
  }, {});

export const useMatches = (idUsuario, consulta) => {
  const [todos, setTodos]       = useState([]);
  const [porGrupo, setPorGrupo] = useState(estadoInicial);
  const [pending, setPending]   = useState(true);

  useEffect(() => {
    (async () => {
      const [response, user] = await Promise.all([
        apiTodosUser(),
        consulta && idUsuario ? consulta(idUsuario) : Promise.resolve(null),
      ]);

      const matchesPorGrupo = response?.data ? agrupar(response.data) : {};
      const listPorGrupo    = user?.data     ? agrupar(user.data)     : {};

      const grouped = GRUPOS.reduce((acc, g) => {
        acc[g] = {
          matches: matchesPorGrupo[g] ?? [],
          list:    listPorGrupo[g]    ?? [],
        };
        return acc;
      }, {});

      if (response?.data) setTodos(response.data);
      setPorGrupo(grouped);
      setPending(false);
    })();
  }, []);

  const changeFunction = (indx, gol1, gol2) => {
    const data = todos.map((x) =>
      x.idPartido == indx ? { ...x, golesEquipo1: gol1, golesEquipo2: gol2 } : x
    );
    setTodos(data);
    const actualizados = agrupar(data);
    setPorGrupo((prev) =>
      GRUPOS.reduce((acc, g) => {
        acc[g] = { matches: actualizados[g] ?? [], list: prev[g].list };
        return acc;
      }, {})
    );
  };

  return { pending, porGrupo, changeFunction };
};
