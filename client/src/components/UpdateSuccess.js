import React from "react";
import { Link } from "react-router-dom";

function UpdateSuccess() {
    
    return(
        <div className="centered-container">
            <p>period successfully edited. now, do you want to...</p>
                <Link to="/all_periods" className="button">view all periods</Link>
                <Link to="/homepage" className="button">go home</Link>
        </div>
    )
}

export default UpdateSuccess;

