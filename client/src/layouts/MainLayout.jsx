import React from "react";
import Nav from "../components/Header/Nav";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div className="max-w-7xl  mx-auto lg:px-4 xl:px-0">
      <Nav />
      <main className="px-2">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
