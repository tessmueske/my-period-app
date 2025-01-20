import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

function Login({ onLogin }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email format")
      .required("email is required"),
    password: Yup.string()
      .required("password is required")
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    fetch("/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => {
        setSubmitting(false);
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            navigate("/homepage");
          });
        } else {
          r.json().then((err) => {
            if (r.status === 404) {
              setErrors({ email: "email not registered" });
            } else {
              setErrors({ password: "invalid login credentials :(" });
            }
          });
        }
      })
      .catch(() => {
        setSubmitting(false);
        setErrors({ general: "something went wrong. please try again." });
      });
  };

  return (
    <div className="centered-container">
      <div className="mainContainer">
        <div className="titleContainer">
          <div><h2>log in to Crimson</h2></div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <p>email:</p>
              <div className="inputContainer">
                <Field
                  type="email"
                  name="email"
                  placeholder="email"
                  className="inputBox"
                />
                <ErrorMessage name="email" component="div" className="errorLabel" />
              </div>

              <br />
              <p>password:</p>
              <div className="inputContainer">
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="inputBox"
                />
                <br></br>
                <ErrorMessage name="password" component="div" className="errorLabel" />
              </div>

              <br />

              <div className="inputContainer">
                <button type="submit" className="button" disabled={isSubmitting}>
                  {isSubmitting ? "logging in..." : "log in"}
                </button>
              </div>

              <div className="inputContainer">
                <button type="button" className="button" onClick={() => navigate("/")}>
                  back
                </button>
              </div>

              {errors.general && (
                <div className="errorContainer">
                  <p className="errorText">{errors.general}</p>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;