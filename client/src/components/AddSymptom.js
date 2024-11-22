import React from "react";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function AddSymptom({ selectedPeriod }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("symptom name is required"),
    severity: Yup.number()
      .required("severity is required")
      .min(1, "severity must be at least 1")
      .max(5, "severity must be at most 5")
      .typeError("severity must be a number"),
  });

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    setSubmitting(true);
    fetch('/add_symptom', {
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
        validationSchema={validationSchema}
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
                placeholder="add symptom name"
              />
            </div>

            <br />

            <div className="inputContainer">
              <label htmlFor="symptom-severity">severity: </label>
              <br />
              <Field
                type="text"
                id="symptom-severity"
                name="severity"
                placeholder="add symptom severity"
              />
            </div>

            <br />

            {errors.serverError && <div className="error">{errors.serverError}</div>}

            <button type="submit" className="symptomButton" disabled={isSubmitting}>
              {isSubmitting ? 'submitting...' : 'submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddSymptom;
