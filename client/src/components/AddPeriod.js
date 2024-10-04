import React, { useState } from "react";

function AddPeriod(){

    const [period, setPeriod] = useState(null);
    const [periodStartDate, setPeriodStartDate] = useState("");
    const [periodEndDate, setPeriodEndDate] = useState("");
    const [notes, setNotes] = useState("")
    const [errors, setErrors] = useState([]); 
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/new_period", {
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
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

      return (
        <form onSubmit={handleSubmit}>
            <div className="inputContainer">
                <input
                    type="date"
                    id="period-start-date"
                    autoComplete="off"
                    value={periodStartDate}
                    onChange={(e) => setPeriodStartDate(e.target.value)}
            />
            </div>
            <div className="inputContainer">
                <input
                    type="date"
                    id="period-end-date"
                    autoComplete="off"
                    value={periodEndDate}
                    onChange={(e) => setPeriodEndDate(e.target.value)}
                />
            </div>
            <div className="inputContainer">
                <input
                    type="text"
                    id="notes"
                    autoComplete="off"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <button type="submit">submit</button>
            {isLoading && <p>loading...</p>}
            <div>
                {errors.map((err) => (
                    <p key={err} className="error">{err}</p>
                ))}
            </div>
        </form>
      );

}

export default AddPeriod;