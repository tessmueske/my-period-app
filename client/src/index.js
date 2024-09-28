import React from "react";
import ReactDOM from "react-dom/client"; 
import App from "./components/App";
import AddPeriod from "./components/AddPeriod";
import About from "./components/About";
import AddSymptom from "./components/AddSymptom";
import Home from "./components/Home";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import PeriodNowWhat from "./components/PeriodNowWhat";
import SymptomNowWhat from "./components/SymptomNowWhat";
import SelectedPeriod from "./components/SelectedPeriod";
import Signup from "./components/Signup";
import ViewAllPeriods from "./components/ViewAllPeriods";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
    <Routes>
        <App />
        <Route path="/" element={<Home />}>
        <Route path="add_period" element={<AddPeriod />} />
        <Route path="about" element={<About />} />
        <Route path="add_symptom" element={<AddSymptom />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="NavBar" element={<NavBar />} />
        <Route path="PeriodNowWhat" element={<PeriodNowWhat />} />
        <Route path="SymptomNowWhat" element={<SymptomNowWhat />} />
        <Route path="SelectedPeriod" element={<SelectedPeriod />} />
        <Route path="ViewAllPeriods" element={<ViewAllPeriods />} />
      </Route>
    </Routes>
  </BrowserRouter>
)