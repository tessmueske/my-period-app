import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ user, setUser }){

    const navigate = useNavigate();

    fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
        setUser(null);
        navigate("/home")
        }
    });

return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}

export default Logout;