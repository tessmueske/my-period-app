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
        <App />
  </BrowserRouter>
);
