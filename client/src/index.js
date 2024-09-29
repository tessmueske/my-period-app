import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App"; 
import AddPeriod from "./components/AddPeriod";
import About from "./components/About";
import AddSymptom from "./components/AddSymptom";
import Home from "./components/Home";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PeriodNowWhat from "./components/PeriodNowWhat";
import SymptomNowWhat from "./components/SymptomNowWhat";
import SelectedPeriod from "./components/SelectedPeriod";
import Signup from "./components/Signup";
import ViewAllPeriods from "./components/ViewAllPeriods";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}> 
        <Route index element={<Home />} />
        <Route path="homepage" element={<Homepage />} />
        <Route path="period/new" element={<AddPeriod />} />
        <Route path="symptom/new" element={<AddSymptom />} />
        <Route path="period_success" element={<PeriodNowWhat />} />
        <Route path="symptom_success" element={<SymptomNowWhat />} />
        <Route path="selected_period" element={<SelectedPeriod />} />
        <Route path="all/periods" element={<ViewAllPeriods />} />
      </Route>

      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>
);
