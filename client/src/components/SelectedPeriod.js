import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function SelectedPeriod({ period }) {

    return (
        <div>
            <h2>details:</h2>
            <p>start date: {new Date(period.start_date).toLocaleDateString()}</p>
            <p>end date: {new Date(period.end_date).toLocaleDateString()}</p>
            <p>notes: {period.notes}</p>
            {period.symptoms && (
                <div>
                    <h3>symptoms:</h3>
                    <ul>
                        {period.symptoms.map((symptom, index) => (
                            <li key={index}>{symptom}</li>
                        ))}
                    </ul>
                </div>
            )}
            <Link to="/add_symptom" className="button">add a symptom</Link>
        </div>
    );
}

export default SelectedPeriod;