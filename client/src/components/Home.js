import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>welcome to Crimson, an app for all people who menstruate</h1>
            <Link to="/login">log in</Link><br></br>
            <Link to="/signup">sign up</Link><br></br>
            <Link to="/about">about us</Link><br></br>
        </>
    );
}

export default Home;
