import React from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

function AddSymptom({ selectedPeriod }) {
  const navigate = useNavigate();

  console.log(selectedPeriod)

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    setSubmitting(true);
    fetch('http://localhost:3000/add_symptom', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        severity: values.severity,
        period_id: selectedPeriod.id,
      }),
    })
      .then((r) => {
        setSubmitting(false);
        if (r.ok) {
          r.json().then((symptom) => {
            resetForm();  
            navigate('/symptom_success'); 
          });
        } else {
          r.json().then((err) => setErrors({ serverError: err.errors }));
        }
      });
  };

  return (
    <div className="add-container">
      <h3>add a new symptom to this period:</h3>
      <br />

      <Formik
        initialValues={{
          name: '',
          severity: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="inputContainer">
              <label htmlFor="symptom-name">symptom name: </label>
              <br />
              <Field
                type="text"
                id="symptom-name"
                name="name"
                placeholder="enter symptom name"
              />
            </div>

            <br />

            <div className="inputContainer">
              <label htmlFor="symptom-severity">severity (1-5): </label>
              <br />
              <Field
                type="number"
                id="symptom-severity"
                name="severity"
                placeholder="enter severity (1-5)"
              />
            </div>

            <br />

            {errors.serverError && <div className="error">{errors.serverError}</div>}

            <button type="submit" className="periodButton" disabled={isSubmitting}>
              {isSubmitting ? "submitting..." : "submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddSymptom;