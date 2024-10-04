import React from "react";
import { Link } from "react-router-dom";

function PeriodNowWhat(){
    return(
        <div className="centered-container">
            <p>period successfully added. now, do you want to...</p>
                <Link to="/new_period" className="button">add another period</Link>
                <Link to="/new_symptom" className="button">add a symptom</Link>
                <Link to="/my_periods" className="button">view all periods</Link>
                <Link to="/homepage" className="button">go home</Link>
        </div>
    )
}

export default PeriodNowWhat;