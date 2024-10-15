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
      fetch(`/periods/${selectedPeriod.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          updateSelectedPeriod(data);
          navigate('/period_update_success');
        })
        .catch((error) => {
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