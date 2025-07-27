import React from "react";
import Nav from "../components/Header/Nav";
import Container from "../components/common/Container";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Container>
      <Nav />
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default MainLayout;
