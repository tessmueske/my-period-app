import React from "react";
import { Link } from "react-router-dom";
import '../index.css'; 

function Home() {
    return (
        <div className="centered-container">
            <h2>welcome to Crimson,</h2>
            <h2>an app for all people who menstruate</h2>
            <br />
            <Link to="/login" className="button">log in</Link>
            <Link to="/signup" className="button">sign up</Link>
            <Link to="/about" className="button">about us</Link>
            <br />
        </div>
    );
}

export default Home;