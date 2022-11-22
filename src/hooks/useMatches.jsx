import { useState, useEffect } from "react";
import { apiPartidos } from "../api/apiPartidos";
import { apiTodosUser } from "../api/apiPartidos";

export const useMatches = (idUsuario, consulta) => {
  const [todos, setTodos] = useState([]);
  const [matchesA, setMatchesA] = useState([]);
  const [listA, setListA] = useState([]);
  const [matchesB, setMatchesB] = useState([]);
  const [listB, setListB] = useState([]);
  const [matchesC, setMatchesC] = useState([]);
  const [listC, setListC] = useState([]);
  const [matchesD, setMatchesD] = useState([]);
  const [listD, setListD] = useState([]);
  const [matchesE, setMatchesE] = useState([]);
  const [listE, setListE] = useState([]);
  const [matchesF, setMatchesF] = useState([]);
  const [listF, setListF] = useState([]);
  const [matchesG, setMatchesG] = useState([]);
  const [listG, setListG] = useState([]);
  const [matchesH, setMatchesH] = useState([]);
  const [listH, setListH] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await apiTodosUser();
    const user = consulta && idUsuario ? await consulta(idUsuario) : null;
    if (response.data) {
      setTodos(response.data);
      const A = response.data.filter((m) => m.grupoEquipo1 == "A");
      setMatchesA(A);
      const B = response.data.filter((m) => m.grupoEquipo1 == "B");
      setMatchesB(B);
      const C = response.data.filter((m) => m.grupoEquipo1 == "C");
      setMatchesC(C);
      const D = response.data.filter((m) => m.grupoEquipo1 == "D");
      setMatchesD(D);
      const E = response.data.filter((m) => m.grupoEquipo1 == "E");
      setMatchesE(E);
      const F = response.data.filter((m) => m.grupoEquipo1 == "F");
      setMatchesF(F);
      const G = response.data.filter((m) => m.grupoEquipo1 == "G");
      setMatchesG(G);
      const H = response.data.filter((m) => m.grupoEquipo1 == "H");
      setMatchesH(H);
    }
    if (user != null && user.data) {
      const Al = user.data.filter((m) => m.grupoEquipo1 == "A");
      setListA(Al);
      const Bl = user.data.filter((m) => m.grupoEquipo1 == "B");
      setListB(Bl);
      const Cl = user.data.filter((m) => m.grupoEquipo1 == "C");
      setListC(Cl);
      const Dl = user.data.filter((m) => m.grupoEquipo1 == "D");
      setListD(Dl);
      const El = user.data.filter((m) => m.grupoEquipo1 == "E");
      setListE(El);
      const Fl = user.data.filter((m) => m.grupoEquipo1 == "F");
      setListF(Fl);
      const Gl = user.data.filter((m) => m.grupoEquipo1 == "G");
      setListG(Gl);
      const Hl = user.data.filter((m) => m.grupoEquipo1 == "H");
      setListH(Hl);
    }
    setPending(false);
  };

  const changeFunction = (indx, gol1, gol2) => {
    const data = [...todos];
    const index = data.findIndex((x) => x.idPartido == indx);
    data[index] = {
      ...data[index],
      golesEquipo1: gol1,
      golesEquipo2: gol2,
    };
    setTodos(data);
    const A = data.filter((m) => m.grupoEquipo1 == "A");
    setMatchesA(A);
    const B = data.filter((m) => m.grupoEquipo1 == "B");
    setMatchesB(B);
    const C = data.filter((m) => m.grupoEquipo1 == "C");
    setMatchesC(C);
    const D = data.filter((m) => m.grupoEquipo1 == "D");
    setMatchesD(D);
    const E = data.filter((m) => m.grupoEquipo1 == "E");
    setMatchesE(E);
    const F = data.filter((m) => m.grupoEquipo1 == "F");
    setMatchesF(F);
    const G = data.filter((m) => m.grupoEquipo1 == "G");
    setMatchesG(G);
    const H = data.filter((m) => m.grupoEquipo1 == "H");
    setMatchesH(H);
  };

  return {
    pending,
    matchesA,
    listA,
    matchesB,
    listB,
    matchesC,
    listC,
    matchesD,
    listD,
    matchesE,
    listE,
    matchesF,
    listF,
    matchesG,
    listG,
    matchesH,
    listH,
    changeFunction,
  };
};
