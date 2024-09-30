import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const NavBar = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/home");
      }
    });
  };

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
            <button onClick={handleLogout} style={{ border: "none", background: "none", cursor: "pointer" }}>
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