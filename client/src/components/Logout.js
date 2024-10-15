import React from "react";

function Logout({ handleLogout }){

    const confirmLogout = () => {
        if (window.confirm("are you sure you want to log out?")) {
          handleLogout();
        }
      };

return (
    <div>
      <button onClick={confirmLogout}>
        log out
    </button>
    </div>
  );
}

export default Logout;