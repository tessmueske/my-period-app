import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UpdatePeriod({ selectedPeriod }) {
    const [period, setPeriod] = useState(null);
    const [periodStartDate, setPeriodStartDate] = useState("");
    const [periodEndDate, setPeriodEndDate] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5555/periods/${selectedPeriod.id}`)
          .then((r) => r.json())
          .then((data) => {
            setPeriod(data);
            setPeriodStartDate(data.start_date);
            setPeriodEndDate(data.end_date);
            setNotes(data.notes);
          })
          .catch((err) => {
            console.error("Error fetching period:", err);
            setErrors([err.message]);
          });
      }, [selectedPeriod.id]);

      function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch(`http://localhost:5555/periods/${selectedPeriod.id}/edit`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
          body: JSON.stringify({
            start_date: periodStartDate,
            end_date: periodEndDate,
            notes: notes,
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((updatedPeriod) => setPeriod(updatedPeriod));
            navigate('/period_update_success'); 
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

      return (
        <div className="centered-container">
          <h3>update period of {selectedPeriod.start_date} through {selectedPeriod.end_date}</h3>
          {Array.isArray(errors) && errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="inputContainer">
              <label htmlFor="period-start-date">updated start date: </label>
              <br />
              <input
                type="date"
                id="period-start-date"
                value={periodStartDate || ""}
                onChange={(e) => setPeriodStartDate(e.target.value)}
              />
            </div>
    
            <br />
    
            <div className="inputContainer">
              <label htmlFor="period-end-date">updated end date: </label>
              <br />
              <input
                type="date"
                id="period-end-date"
                value={periodEndDate || ""}
                onChange={(e) => setPeriodEndDate(e.target.value)}
              />
            </div>
    
            <br />
    
            <div className="inputContainer">
              <label htmlFor="notes">notes: </label>
              <br />
              <input
                type="text"
                id="notes"
                placeholder="add any notes about this period"
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
    
            <br />
    
            <button type="submit" className="button">
              {isLoading ? "updating..." : "submit"}
            </button>
          </form>
        </div>
      );
    }    

export default UpdatePeriod;


// navigate('/period_update_success')

//App.js: /periods/:period_id/edit
//app.py: /periods/<int:period_id>/edit