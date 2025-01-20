import React from "react";
import { useFormik } from "formik"; 
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

function Signup({ onSignup }) {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("invalid email format")
      .required("email is required"), 
    password: Yup.string()
      .required("password is required")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = ({ email, password }) => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => {
        if (r.ok) {
          handleLogin(email, password);
        } else {
          r.json().then((err) => {
            formik.setErrors({ api: err.errors || ["signup failed"] }); 
          });
        }
      })
      .catch(() => {
        formik.setErrors({ api: ["something went wrong. please try again."] });
      });
  };

  const handleLogin = (email, password) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            onSignup(user);
            navigate("/homepage");
          });
        } else {
          formik.setErrors({ api: ["login failed after signup. please try logging in manually."] });
        }
      })
      .catch(() => {
        formik.setErrors({ api: ["something went wrong."] });
      });
  };

  return (
    <div className="centered-container">
      <h2>sign up for crimson</h2>
      <br />
      <p>email:</p>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email" 
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="email"
          required
        />
        <br />
        <br />
        <p>password:</p>
        <input
          type="password"
          name="password" 
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="password"
          required
        />
        <br />
        <br />
        <button type="submit" className="button" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "signing up..." : "sign up"}
        </button>
        <br />
        <button className="button" type="button" onClick={() => navigate("/")}>
          back
        </button>
        {formik.errors.api && (
          <p style={{ color: "red" }}>{formik.errors.api.join(", ")}</p>
        )}
      </form>
    </div>
  );
}

export default Signup;