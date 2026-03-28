import { useCallback, useMemo, useRef, useState } from "react";
import moment from "moment";

export const useSearch = (compareList) => {
  const [search, setSearch] = useState("");
  const [inicio, setInicio] = useState("");
  const [fin, setFin] = useState("");
  const searchInput = useRef(null);
  const searchInicio = useRef(null);
  const searchFin = useRef(null);

  const onChangeText = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const onChangeDateInicio = useCallback(() => {
    searchInicio.current.value
      ? setInicio(
          moment(new Date(searchInicio.current.value))
            .add(1, "day")
            .format("YYYY-MM-DD")
        )
      : setInicio("");
  }, []);

  const onChangeDateFin = useCallback(() => {
    searchFin.current.value
      ? setFin(
          moment(new Date(searchFin.current.value))
            .add(1, "day")
            .format("YYYY-MM-DD")
        )
      : setFin("");
  }, []);

  const dataFiltered = useMemo(
    () =>
      compareList.filter((matche) => {
        const nombre1 = (matche.nombreEquipo1 ?? "").toLowerCase();
        const nombre2 = (matche.nombreEquipo2 ?? "").toLowerCase();
        const term    = search.toLowerCase().trim();
        const fecha   = moment(new Date(matche.fechaPartido)).format("YYYY-MM-DD");

        const matchesText = nombre1.includes(term) || nombre2.includes(term);

        if (inicio && fin)   return matchesText && fecha >= inicio && fecha <= fin;
        if (inicio)          return matchesText && fecha >= inicio;
        if (fin)             return matchesText && fecha <= fin;
        return matchesText;
      }),
    [compareList, search, inicio, fin]
  );

  return {
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
  };
};
