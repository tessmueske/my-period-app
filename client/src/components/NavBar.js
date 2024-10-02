import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../index.css'; 

const NavBar = ({ handleLogout }) => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/homepage">home</Link>
          </li>
          <li>
            <Link to="/all_periods">my periods</Link>
          </li>
          <li>
            <Link to="/add_period">add a period</Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              log out
            </button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;
