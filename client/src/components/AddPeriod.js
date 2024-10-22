import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function AddPeriod({ setSelectedPeriod }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    start_date: Yup.date()
      .required("start date is required")
      .nullable(),
    end_date: Yup.date()
      .nullable()
      .when('start_date', (start_date, schema) => {
        return schema.min(start_date, "end date must be after the start date");
      })
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    fetch('http://localhost:3000/add_period', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: values.start_date,
        end_date: values.end_date,
        notes: values.notes,
      }),
    })
      .then((r) => {
        setSubmitting(false);
        if (r.ok) {
          r.json().then((period) => {
            setSelectedPeriod(period); 
            navigate('/period_success');  
          });
        } else {
          r.json().then((err) => setErrors({ serverError: err.errors }));
        }
      });
  };

  return (
    <div className="add-container">
      <h3>add a new period</h3>
      <br />

      <Formik
        initialValues={{
          start_date: '',
          end_date: '',
          notes: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit} 
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="inputContainer">
              <label htmlFor="period-start-date">start date: </label>
              <br />
              <Field type="date" name="start_date" id="period-start-date" />
            </div>

            <br />

            <div className="inputContainer">
              <label htmlFor="period-end-date">end date: </label>
              <br />
              <Field type="date" name="end_date" id="period-end-date" />
            </div>

            <br />

            <div className="inputContainer">
              <label htmlFor="notes">notes: </label>
              <br />
              <Field
                type="text"
                name="notes"
                id="notes"
                placeholder="add notes about this period"
              />
            </div>

            <br />

            {errors.serverError && <div className="error">{errors.serverError}</div>}

            <button type="submit" className="periodButton" disabled={isSubmitting}>
              {isSubmitting ? 'submitting...' : 'submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddPeriod;