import React, { useState } from "react";
import Login from "./Login"
import Signup from "./Signup"
import About from "./About"


function Home() {
    return (
        <>
        <h1>welcome to crimson, an app for all people who menstruate</h1>
        <h2> log in here</h2><Login />
        <h2> sign up here</h2><Signup />
        <h2> about us </h2><About />
        </>
    );
}

export default Home;