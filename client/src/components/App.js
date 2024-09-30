import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./Home";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import AddPeriod from "./AddPeriod";
import About from "./About";
import AddSymptom from "./AddSymptom";
import Homepage from "./Homepage";
import Logout from "./Logout";
import PeriodNowWhat from "./PeriodNowWhat";
import SymptomNowWhat from "./SymptomNowWhat";
import SelectedPeriod from "./SelectedPeriod";
import ViewAllPeriods from "./ViewAllPeriods";
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

  if (!user) return (<div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/signup" element={<Signup onSignup={setUser} />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </div>)
 
  return (
    <>
      {user && <NavBar setUser={setUser} />}
      <main>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="period/new" element={<AddPeriod />} />
          <Route path="symptom/new" element={<AddSymptom />} />
          <Route path="period_success" element={<PeriodNowWhat />} />
          <Route path="symptom_success" element={<SymptomNowWhat />} />
          <Route path="selected_period" element={<SelectedPeriod />} />
          <Route path="all/periods" element={<ViewAllPeriods />} />
          <Route path="logout" element={<Logout />} />
        </Routes> 
      </main>
    </>
  );
}

export default App;
