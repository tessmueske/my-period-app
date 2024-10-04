import React, { useState } from "react";

function SelectedPeriod(){

    const[selectedPeriod, setSelectedPeriod] = useState(null)

    useEffect(() => {
        fetch('/selected_period')
            .then((response) => response.json())
            .then((selectedPeriod) => setSelectedPeriod(selectedPeriod))
            .catch((error) => console.error("error fetching period data:", error));
    }, []);

    return(
        <div></div>
    )
}

export default SelectedPeriod;