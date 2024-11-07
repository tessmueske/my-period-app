import React from "react";
import '../index.css'; 

function Homepage() {
    return (
        <div className="home-container">
            <p>
                welcome to Crimson. 
            </p>
            <p>
                this is an app for people of all genders to use to track their menstruation cycle. we use no gendered language to refer to products or bodies.
            </p>
            <p>
                click on ‘my periods’ to view all periods by date. there, you can also edit one period’s start or end dates, add or delete symptoms, or delete a period altogether.
            </p>
            <p>
                click on 'add a period' to add a new period entry. 
            </p>
            <br></br>
            ✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤✤
            <br></br>
            <br></br>
            <p className='small-text'>
                Crimson is a project built by tess mueske in the fall of 2024 for Flatiron School.
            </p>
            <p className='small-text'>
                it’s a menstruation tracking app for people of all genders who bleed.
            </p>
        </div>
    )
}

export default Homepage;