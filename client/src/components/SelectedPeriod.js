import React, { useState, useEffect } from "react";

function SelectedPeriod(){

    const[selectedPeriod, setSelectedPeriod] = useState(null)

    useEffect(() => {
        fetch('/selected_period')
            .then((response) => response.json())
            .then((data) => setSelectedPeriod(data))
            .catch((error) => console.error("error fetching period data:", error));
    }, []);

    return (
        <div className="selected-period-container">
            {selectedPeriod ? (
                <div>
                    <h2>details</h2>
                    <p>start date: {selectedPeriod.start_date}</p>
                    <p>end date: {selectedPeriod.end_date}</p>
                    <p>notes: {selectedPeriod.notes}</p>
                </div>
            ) : (
                <p>loading...</p>
            )}
        </div>
    );
}

export default SelectedPeriod;