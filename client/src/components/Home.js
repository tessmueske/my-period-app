import React from "react";
import { Link } from "react-router-dom";
import '../index.css'; 

function Home() {
    return (
        <div className="centered-container">
            <h3>welcome to Crimson,</h3>
            <h3>an app for all people who menstruate</h3>
            <br />
            <Link to="/login" className="button">log in</Link>
            <Link to="/signup" className="button">sign up</Link>
            <Link to="/about" className="button">about us</Link>
            <br />
        </div>
    );
}

export default Home;

// routes to '/'