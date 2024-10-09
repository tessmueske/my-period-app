import React from "react";
import { Link } from "react-router-dom";

function PeriodSuccess({ period }){
    return(
        <div className="centered-container">
            <p>period successfully added. now, do you want to...</p>
                <Link to="/add_period" className="button">add another period</Link>
                <Link to="/add_symptom" className="button">add a symptom</Link>
                <Link to="/all_periods" className="button">view all periods</Link>
                <Link to="/homepage" className="button">go home</Link>
        </div>
    )
}

export default PeriodSuccess;