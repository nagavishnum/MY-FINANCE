import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import './layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div>
      <main className="content">
        <Outlet />
      </main>
      </div>
    </div>
  );
};

export default Layout;
