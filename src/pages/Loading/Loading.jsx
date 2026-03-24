import React from "react";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-ball" />
      <div className="loading-dots">
        <span /><span /><span /><span />
      </div>
      <p className="loading-text">Cargando, por favor espere...</p>
    </div>
  );
};

export default Loading;
