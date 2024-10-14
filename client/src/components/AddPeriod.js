import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPeriod(){

    const [period, setPeriod] = useState(null);
    const [periodStartDate, setPeriodStartDate] = useState("");
    const [periodEndDate, setPeriodEndDate] = useState("");
    const [notes, setNotes] = useState("")
    const [errors, setErrors] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch('http://localhost:3000/add_period', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_date: periodStartDate, 
            end_date: periodEndDate,    
            notes: notes
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((period) => setPeriod(period));
            navigate('/period_success');
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

      return (
        <div className="add-container">
            <h3>add a new period</h3>
            <br></br>
        <form onSubmit={handleSubmit}>

          <div className="inputContainer">
            <label htmlFor="period-start-date">start date: </label>
            <br></br>
            <input
              type="date"
              id="period-start-date"
              value={periodStartDate || ""}
              onChange={(e) => setPeriodStartDate(e.target.value)}
            />
          </div>

          <br></br>
    
          <div className="inputContainer">
            <label htmlFor="period-end-date">end date: </label>
            <br></br>
            <input
              type="date"
              id="period-end-date"
              value={periodEndDate || ""}
              onChange={(e) => setPeriodEndDate(e.target.value)}
            />
          </div>

          <br></br>
    
          <div className="inputContainer">
            <label htmlFor="notes">notes: </label>
            <br></br>
            <input
              type="text"
              id="notes"
              placeholder="add notes about this period"
              value={notes || ""}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <br></br>
    
          <button type="submit" className="periodButton">submit</button>
        </form>
        </div>
      );
    }
    
    export default AddPeriod;