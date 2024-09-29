import React, { useState } from "react";

function Logout({ user, setUser }){
    fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
        setUser(null);
        }
    });
}

export default Logout;