import React from "react";
import Header from './Header';

export const Layout = ({children}) => {
  return (
    <div className="Layout">
      <Header />
      <div>{children}</div>
    </div>
  );
};

