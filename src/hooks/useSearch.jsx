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
        if (inicio && fin) {
          return (
            (matche.nombreEquipo1
              .toLowerCase()
              .includes(search.toLowerCase().trim()) ||
              matche.nombreEquipo2
                .toLowerCase()
                .includes(search.toLowerCase().trim())) &&
            moment(new Date(matche.fechaPartido)).format("YYYY-MM-DD") >=
              inicio &&
            moment(new Date(matche.fechaPartido)).format("YYYY-MM-DD") <= fin
          );
        } else if (inicio) {
          return (
            (matche.nombreEquipo1
              .toLowerCase()
              .includes(search.toLowerCase().trim()) ||
              matche.nombreEquipo2
                .toLowerCase()
                .includes(search.toLowerCase().trim())) &&
            moment(new Date(matche.fechaPartido)).format("YYYY-MM-DD") >= inicio
          );
        } else if (fin) {
          return (
            (matche.nombreEquipo1
              .toLowerCase()
              .includes(search.toLowerCase().trim()) ||
              matche.nombreEquipo2
                .toLowerCase()
                .includes(search.toLowerCase().trim())) &&
            moment(new Date(matche.fechaPartido)).format("YYYY-MM-DD") <= fin
          );
        } else {
          return (
            matche.nombreEquipo1
              .toLowerCase()
              .includes(search.toLowerCase().trim()) ||
            matche.nombreEquipo2
              .toLowerCase()
              .includes(search.toLowerCase().trim())
          );
        }
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
