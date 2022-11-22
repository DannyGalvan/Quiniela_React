import React from "react";
import { LoadingComponent } from "../../components/SpinerCarga/LoadingComponent";

const Loading = () => {
  return (
    <div className="page-wrap-loading d-flex flex-row align-items-center bg-container">
      <div className="container">
        <div className="row justify-content-center">
          <h3 className="text-center fw-bold">Cargando Porfavor espere...</h3>
          <LoadingComponent variant="info" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
