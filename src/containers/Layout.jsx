import React, { useContext } from "react";
import Header from './Header';
import { ThemeContext } from "../context/themeContext";
import { ChatWidget } from "../components/Chat/ChatWidget";

export const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="Layout" data-theme={theme}>
      <Header />
      <div>{children}</div>
      <ChatWidget />
    </div>
  );
};
