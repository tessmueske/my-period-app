import React from "react";
import { useFormik } from "formik"; 
import { useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const handleSignup = ({ email, password }) => {
    fetch("http://localhost:5555/signup", {
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
    fetch("http://localhost:5555/login", {
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


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Signup({ onSignup }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const navigate = useNavigate();

//   function handleSignup() {
//     setIsLoading(true);
//     fetch("http://localhost:5555/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then((r) => {
//         if (r.ok) {
//           handleLogin();
//         } else {
//           setIsLoading(false); 
//           r.json().then((err) => setErrors(err.errors || ["signup failed"]));
//         }
//       })
//       .catch(() => {
//         setIsLoading(false);
//         setErrors(["something went wrong. please try again."]);
//       });
//   }

//   function handleLogin() {
//     fetch("http://localhost:5555/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ email, password }),
//       credentials: "include"
//     })
//       .then((r) => {
//         if (r.ok) {
//           r.json().then((user) => {
//             onSignup(user); 
//             navigate("/homepage"); 
//           });
//         } else {
//           setErrors(["login failed after signup. please try logging in manually."]);
//         }
//       })
//       .catch(() => {
//         setErrors(["something went wrong."]);
//       });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     handleSignup(); 
//   }

//   const handleBack = () => {
//     navigate("/");
//   };


//   return (
//     <div className="centered-container">
//       <h2>sign up for crimson</h2>
//       <br></br>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="email"
//           required
//         />
//         <br></br>
//         <br></br>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="password"
//           required
//         />
//         <br></br>
//         <br></br>
//         <button type="submit" className="button" disabled={isLoading}>
//           {isLoading ? "signing up..." : "sign up"}
//         </button>
//         <br></br>
//           <button className="button" onClick={handleBack}>
//             back
//           </button>
//         {errors.length > 0 && errors.map((error, index) => (
//           <p key={index} style={{ color: "red" }}>{error}</p>
//         ))}
//       </form>
//     </div>
//   );
// }

// export default Signup;
