import React from "react";
import { Link, useLocation } from "react-router-dom";
import './sidebar.css';
import { sidebarRoutes } from "../constants/ConstantData";

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="sidebar">
      <nav>
        {sidebarRoutes?.map((e) => {
          const isActive = location.pathname.includes(`/finance/${e.key}`);
          return (
            <div key={e.key} className={`sidebar-item ${isActive ? "active" : ""}`}>
              <Link to={`/finance/${e.key}`}>{e.name}</Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
