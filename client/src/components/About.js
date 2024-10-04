import React from "react";
import '../index.css'; 
import { useNavigate } from "react-router-dom";

function About() {
    const navigate = useNavigate(); 

    const handleBack = () => {
        navigate('/'); 
    };

    return (
            <div className="centered-container">
            <p>
                Crimson is a project built by tess mueske in the fall of 2024 for Flatiron School.
            </p>
            <p>
                it’s a menstruation tracking app for people of all genders who bleed.
            </p>
            <div className="inputContainer">
                <button className="button" onClick={handleBack}>back</button>
            </div>
        </div>
    );
}

export default About;
