import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./Home";
import NavBar from "./NavBar";
import '../index.css'; 

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
