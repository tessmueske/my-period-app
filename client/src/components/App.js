import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* home page */}
      <Home />
      {/* about page */}
      <About /> 
      {/* navigation */}
      <NavBar /> 
      {/* create account page */}
      <CreateAccount /> 
      {/* login page */}
      <Login /> 
      {/* home landing page AFTER login */}
      <Homepage />
      {/* form for adding a period */} 
      <AddPeriod /> 
      {/* form for adding a symptom */}
      <AddSymptom /> 
      {/* viewing all periods, has calendar scroll function */}
      <ViewAllPeriods /> 
      {/* calendar that shows all periods */}
      <PeriodCalendar />
      {/* once a period is selected, options here */}
      <SelectedPeriod /> 
      {/* after new period is added, landing page with new options */}
      <NowWhat /> 
      {/* after new symptom is added, landing page with new options */}
      <NowWhat2 /> 
    </div>
  );
}

export default App;
