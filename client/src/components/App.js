import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* login page */}
      <Login /> 
      {/* home landing page */}
      <Homepage />
      {/* form for adding a period */} 
      <AddPeriod /> 
    </div>
  );
}

export default App;
