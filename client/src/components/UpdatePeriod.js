import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

function UpdatePeriod({ selectedPeriod, updateSelectedPeriod }) {
    const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      start_date: selectedPeriod.start_date,
      end_date: selectedPeriod.end_date,
      notes: selectedPeriod.notes,
      symptoms: selectedPeriod.symptoms || [],
    },
    onSubmit: (values) => {
      // Make your API call to update the period
      fetch(`/periods/${selectedPeriod.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          // After a successful update, call the update function
          updateSelectedPeriod(data);
          navigate('/period_update_success');
          // Redirect or close the form as needed
        })
        .catch((error) => {
          // Handle errors
          console.error("Error updating period:", error);
        });
    },
  });

  return (
    <div className="centered-container">
      <h3>update period from {selectedPeriod.start_date} to {selectedPeriod.end_date}</h3>
      {formik.errors.api && (
        <div className="errors">
          <p>{formik.errors.api.join(", ")}</p>
        </div>
      )}
      <br></br>
      <br></br>
      <form onSubmit={formik.handleSubmit}>
        <label>
          start date: 
          <input
            type="date"
            name="start_date"
            onChange={formik.handleChange}
            value={formik.values.start_date}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          end date: 
          <input
            type="date"
            name="end_date"
            onChange={formik.handleChange}
            value={formik.values.end_date}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          notes: 
          <textarea
            name="notes"
            onChange={formik.handleChange}
            value={formik.values.notes}
          />
        </label>
        <br></br>
        <br></br>
        <button type="submit">update period</button>
      </form>
    </div>
  );
}

export default UpdatePeriod;





// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function UpdatePeriod({ selectedPeriod }) {
//     const [period, setPeriod] = useState(null);
//     const [periodStartDate, setPeriodStartDate] = useState("");
//     const [periodEndDate, setPeriodEndDate] = useState("");
//     const [notes, setNotes] = useState("");
//     const [errors, setErrors] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetch(`http://localhost:5555/periods/${selectedPeriod.id}`)
//           .then((r) => r.json())
//           .then((data) => {
//             setPeriod(data);
//             setPeriodStartDate(data.start_date);
//             setPeriodEndDate(data.end_date);
//             setNotes(data.notes);
//           })
//           .catch((err) => {
//             console.error("Error fetching period:", err);
//             setErrors([err.message]);
//           });
//       }, [selectedPeriod.id]);

//       function handleSubmit(e) {
//         e.preventDefault();
//         setErrors([]);
//         setIsLoading(true);
//         fetch(`http://localhost:5555/periods/${selectedPeriod.id}/edit`, {
//           method: "PUT", 
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: 'include',
//           body: JSON.stringify({
//             start_date: periodStartDate,
//             end_date: periodEndDate,
//             notes: notes,
//           }),
//         }).then((r) => {
//           setIsLoading(false);
//           if (r.ok) {
//             r.json().then((updatedPeriod) => setPeriod(updatedPeriod));
//             navigate('/period_update_success'); 
//           } else {
//             r.json().then((err) => setErrors(err.errors));
//           }
//         });
//       }

//       return (
//         <div className="centered-container">
//           <h3>update period of {selectedPeriod.start_date} through {selectedPeriod.end_date}</h3>
//           {Array.isArray(errors) && errors.length > 0 && (
//             <div className="errors">
//               {errors.map((error, index) => (
//                 <p key={index}>{error}</p>
//               ))}
//             </div>
//           )}
//           <form onSubmit={handleSubmit}>
//             <div className="inputContainer">
//               <label htmlFor="period-start-date">updated start date: </label>
//               <br />
//               <input
//                 type="date"
//                 id="period-start-date"
//                 value={periodStartDate || ""}
//                 onChange={(e) => setPeriodStartDate(e.target.value)}
//               />
//             </div>
    
//             <br />
    
//             <div className="inputContainer">
//               <label htmlFor="period-end-date">updated end date: </label>
//               <br />
//               <input
//                 type="date"
//                 id="period-end-date"
//                 value={periodEndDate || ""}
//                 onChange={(e) => setPeriodEndDate(e.target.value)}
//               />
//             </div>
    
//             <br />
    
//             <div className="inputContainer">
//               <label htmlFor="notes">notes: </label>
//               <br />
//               <input
//                 type="text"
//                 id="notes"
//                 placeholder="add any notes about this period"
//                 value={notes || ""}
//                 onChange={(e) => setNotes(e.target.value)}
//               />
//             </div>
    
//             <br />
    
//             <button type="submit" className="button">
//               {isLoading ? "updating..." : "submit"}
//             </button>
//           </form>
//         </div>
//       );
//     }    

// export default UpdatePeriod;


// navigate('/period_update_success')

//App.js: /periods/:period_id/edit
//app.py: /periods/<int:period_id>/edit