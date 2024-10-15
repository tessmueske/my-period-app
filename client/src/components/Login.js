import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    fetch("http://localhost:5555/login", {
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
          <div>log in to Crimson</div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
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

              <div className="inputContainer">
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="inputBox"
                />
                <ErrorMessage name="password" component="div" className="errorLabel" />
              </div>

              <br />

              <div className="inputContainer">
                <button type="submit" className="button" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "log in"}
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


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState([]);

//   const navigate = useNavigate();

//   function handleSubmit(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     fetch("http://localhost:5555/login", { 
//         method: "POST",
//         credentials: 'include',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//     })
//       .then((r) => {
//         setIsLoading(false);
//         if (r.ok) {
//           r.json().then((user) => {
//             onLogin(user);
//             navigate("/homepage");
//           });
//         } else {
//           r.json().then((err) => {
//             if (r.status === 404) {
//               setErrors(["email not registered"]);
//             } else {
//               setErrors(err.errors || ["invalid login credentials :("]);
//             }
//           });
//         }
//       })
//       .catch(() => {
//         setIsLoading(false);
//         setErrors(["something went wrong. please try again."]);
//       });
//   }

//   const onButtonClick = (e) => {
//     e.preventDefault();
//     setEmailError("");
//     setPasswordError("");
//     setErrors([]);

//     if (email === "") {
//       setEmailError("*Please enter your email");
//       return;
//     }

//     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
//     if (!emailRegex.test(email)) {
//       setEmailError(" * please enter a valid email");
//       return;
//     }

//     if (password === "") {
//       setPasswordError(" * please enter a password");
//       return;
//     }

//     handleSubmit(e);
//   };

//   const handleBack = () => {
//     navigate("/");
//   };

//   return (
//     <div className="centered-container">
//       <div className="mainContainer">
//         <div className="titleContainer">
//           <div>log in to Crimson</div>
//         </div>
//         <br />
//         <div className="inputContainer">
//           <input
//             value={email}
//             placeholder="email"
//             onChange={(e) => setEmail(e.target.value)}
//             className="inputBox"
//           />
//           <label className="errorLabel">{emailError}</label>
//         </div>
//         <br />
//         <div className="inputContainer">
//           <input
//             value={password}
//             placeholder="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="inputBox"
//           />
//           <label className="errorLabel">{passwordError}</label>
//         </div>
//         <br />
//         <div className="inputContainer">
//           <button className="button" onClick={onButtonClick}>
//             log in
//           </button>
//         </div>
//         <div className="inputContainer">
//           <button className="button" onClick={handleBack}>
//             back
//           </button>
//         </div>
//         {errors.length > 0 && (
//           <div className="errorContainer">
//             {errors.map((error, index) => (
//               <p key={index} className="errorText">
//                 {error}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;
