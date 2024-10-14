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
import DeleteSymptom from "./DeleteSymptom";
import UpdatePeriod from "./UpdatePeriod";
import UpdateSuccess from "./UpdateSuccess"
import '../index.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [deleteSymptom, setDeleteSymptom] = useState(null)
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
    console.log("Attempting to log out...");
    fetch("http://localhost:5555/logout", { 
      method: "DELETE",
      credentials: "include"
    })
    .then((response) => {
      console.log("Response status:", response.status);
      if (response.status === 204) {
        navigate("/");
      } else {
        console.error("Logout failed:", response);
      }
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
}
  

  const handleSymptomDelete = (symptomId) => {
    fetch(`/symptoms/${symptomId}/delete`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          setDeleteSymptom(null); 
          console.log("symptom deleted successfully");
        }
      })
      .catch((error) => {
        console.error("symptom deletion failed:", error);
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
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/add_period" element={<AddPeriod />} />
              <Route path="/add_symptom" element={<AddSymptom selectedPeriod={selectedPeriod} />} /> 
              <Route path="/periods/:period_id/delete" element={<DeletePeriod selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />} />
              <Route path="/periods/:period_id/symptoms/delete" element={<DeleteSymptom handleSymptomDelete={handleSymptomDelete} selectedPeriod={selectedPeriod}/>} />
              <Route path="/period_success" element={<PeriodSuccess />} />
              <Route path="/symptom_success" element={<SymptomSuccess />} />
              <Route path="/all_periods" element={<PeriodCalendar selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />} />
              <Route path="/periods/:period_id/edit" element={<UpdatePeriod selectedPeriod={selectedPeriod} />} />
              <Route path="/period_update_success" element={<UpdateSuccess />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;

