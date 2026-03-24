import React, { useContext } from "react";
import Header from './Header';
import { ThemeContext } from "../context/themeContext";

export const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="Layout" data-theme={theme}>
      <Header />
      <div>{children}</div>
    </div>
  );
};
