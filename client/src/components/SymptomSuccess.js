import React, { useState, Link } from "react";

function SymptomNowWhat(){
    return(
        <div className="centered-container">
        <p>symptom successfully added. now, do you want to...</p>
            <Link to="/new_symptom" className="button">add another symptom to this period</Link>
            <Link to="/new_period" className="button">add a new period</Link>
            <Link to="/all_periods" className="button">view all periods</Link>
            <Link to="/homepage" className="button">go home</Link>
        </div>
    )
}

export default SymptomNowWhat;