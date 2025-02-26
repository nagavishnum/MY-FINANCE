import React from "react";
import { Link } from "react-router-dom";
import './sidebar.css';
import { sidebarRoutes } from "../constants/ConstantData";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        {sidebarRoutes?.map((e)=> (
                <div key={e.key}>
                    <Link to={`/finance/${e.key}`}>{e.name}</Link>
                </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
