import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false); 
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
    .then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => {
              onLogin(user);
              navigate("/homepage");
            });
        } else {
            r.json().then((err) => {
                setErrors(err.errors || ["Invalid login credentials."]);
            });
        }
    });
}

    const onButtonClick = (e) => {
        e.preventDefault();
        setEmailError('');
        setPasswordError('');
        setErrors([]); 
        if ('' === email) {
            setEmailError('*please enter your email')
            return
        }
        
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('*please enter a valid email')
            return
        }
        
        if ('' === password) {
            setPasswordError('*please enter a password')
            return
        }

        handleSubmit(e);
    };

    const handleBack = () => {
        navigate('/'); 
      };

    return (
        <div className="mainContainer">
          <div className="titleContainer">
            <div>log in to Crimson</div>
          </div>
          <br />
          <div className="inputContainer">
            <input
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <div className="inputContainer">
            <input
              value={password}
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="inputBox"
            />
            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
          <div className="inputContainer">
            <button className="button" onClick={onButtonClick}>
              log in
            </button>
          </div>
          <div className="inputContainer">
        <button className="button" onClick={handleBack}>back</button>
      </div>
        </div>
      );
    }
    
    export default Login;