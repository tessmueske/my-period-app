import React from "react";
import { Link } from "react-router-dom";
import '../index.css'; 

function Home() {
    return (
        <>
            <h2>welcome to Crimson, </h2>
            <h2>an app for all people who menstruate</h2><br></br>
            <Link to="/login">log in</Link><br></br>
            <Link to="/signup">sign up</Link><br></br>
            <Link to="/about">about us</Link><br></br>
        </>
    );
}

export default Home;
