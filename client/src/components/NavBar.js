import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
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
              <Link to="/logout">=log out</Link>
            </li>
          </ul>
        </nav>
  
        <Outlet />
      </>
    )
  };
  
  export default NavBar;