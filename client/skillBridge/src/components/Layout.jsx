import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import daylightTheme from "../theme";

const Layout = () => {
  const { colors } = daylightTheme;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: colors.background }}>
      <Navbar />
      <main style={{ flex: 1, width: "100%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem" }}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;


