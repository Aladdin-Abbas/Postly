import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
const SharedLayout = () => {
  return (
    <>
      <Header />
      <section className="container">
        <Outlet />
      </section>
    </>
  );
};

export default SharedLayout;
