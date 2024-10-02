import React, { useState } from "react";

function Logout({ handleLogout }){

return (
    <div>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
}

export default Logout;