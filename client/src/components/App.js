import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"; 
import Home from "./Home";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import AddPeriod from "./AddPeriod";
import About from "./About";
import AddSymptom from "./AddSymptom";
import Homepage from "./Homepage";
import PeriodSuccess from "./PeriodSuccess";
import SymptomSuccess from "./SymptomSuccess";
import PeriodCalendar from "./PeriodCalendar";
import DeletePeriod from "./DeletePeriod";
import '../index.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [deletePeriod, setDeletePeriod] = useState(null)
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5555/logout", { 
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setUser(null); 
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("logout failed:", error);
      });
  };

  const handleDelete = (periodId) => {
    fetch(`http://localhost:5555/selected_period/${periodId}/delete`, { 
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setDeletePeriod(null); 
        }
      })
      .catch((error) => {
        console.error("deletion failed:", error);
      });
  };
  

  return (
    <>
      {user && <NavBar setUser={setUser} handleLogout={handleLogout} />}
      <main>
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={setUser} />} />
              <Route path="/signup" element={<Signup onSignup={setUser} />} />
              <Route path="/about" element={<About />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Homepage />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/add_period" element={<AddPeriod />} />
              <Route path="/add_symptom" element={<AddSymptom period={selectedPeriod} />} /> 
              <Route path="/selected_period/:period_id/delete" element={<DeletePeriod handleDelete={handleDelete} />} />
              <Route path="/period_success" element={<PeriodSuccess />} />
              <Route path="/symptom_success" element={<SymptomSuccess />} />
              <Route path="/all_periods" element={<PeriodCalendar selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;