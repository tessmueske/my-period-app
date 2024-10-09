import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddSymptom({ period }){

    const [symptom, setSymptom] = useState("");
    const [severity, setSeverity] = useState("");
    const [errors, setErrors] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch('http://localhost:3000/add_symptom', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            symptom: symptom,
            severity: severity,
            period_id: period.id,
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((symptom) => setSymptom(symptom));
            navigate('/symptom_success');
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

      return (
        <div className="add-container">
            <h3>add a new symptom to the period of dates {period.start_date} through {period.end_date}</h3>
            <br></br>
        <form onSubmit={handleSubmit}>

          <div className="inputContainer">
            <label htmlFor="symptom-name">symptom name: </label>
            <br></br>
            <input
              type="text"
              id="symptom-name"
              value={symptom}
              onChange={(e) => setSymptom(e.target.value)}
            />
          </div>

          <br></br>

          <div className="inputContainer">
            <label htmlFor="symptom-severity">severity (1-5): </label>
            <br></br>
            <input
              type="number"
              id="symptom-severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            />
          </div>
    
          <button type="submit" className="periodButton">
                {isLoading ? "submitting..." : "submit"}
              </button>
            </form>

            {errors.length > 0 && (
              <div className="errors">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      );
}

export default AddSymptom;