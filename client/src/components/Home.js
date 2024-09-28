import React from "react";
import { Link } from "react-router-dom";
import '../index.css'; 

function Home() {
    return (
        <>
            <h2>welcome to Crimson,</h2>
            <h2>an app for all people who menstruate</h2>
            <br />
            <Link to="/login" className="button">log in</Link>
            <br />
            <Link to="/signup" className="button">sign up</Link>
            <br />
            <Link to="/about" className="button">about us</Link>
            <br />
        </>
    );
}

export default Home;
