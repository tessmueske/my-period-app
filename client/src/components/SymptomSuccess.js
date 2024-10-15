import React from "react";
import { Link } from "react-router-dom"; 

function SymptomSuccess(){
    return(
        <div className="centered-container">
        <p>symptom successfully added. </p>
            <Link to="/all_periods" className="button">view all periods</Link>
            <Link to="/homepage" className="button">go home</Link>
        </div>
    )
}

export default SymptomSuccess;