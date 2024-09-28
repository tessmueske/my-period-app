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
import NavBar from "./components/NavBar";
import PeriodNowWhat from "./components/PeriodNowWhat";
import SymptomNowWhat from "./components/SymptomNowWhat";
import SelectedPeriod from "./components/SelectedPeriod";
import Signup from "./components/Signup";
import ViewAllPeriods from "./components/ViewAllPeriods";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<NavBar />}>
            <Route index element={<Home />} /> 
            <Route path="homepage" element={<Homepage />} />
            <Route path="add_period" element={<AddPeriod />} />
            <Route path="add_symptom" element={<AddSymptom />} />
            <Route path="period_now_what" element={<PeriodNowWhat />} />
            <Route path="symptom_now_what" element={<SymptomNowWhat />} />
            <Route path="selected_period" element={<SelectedPeriod />} />
            <Route path="view_all_periods" element={<ViewAllPeriods />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );