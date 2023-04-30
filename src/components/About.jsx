import React from 'react'
import './about.css'
import Header from './Header'
import Footer from './Footer'

const About = () => {
    return (
        <><Header />
            <div class="about">
                <h1 class='rule-head'>About the game</h1>
                <p>This is a website done for Guvi where you can register with your username and mail id.Then login into your account and change update your details like name,age,gender,mobile number,date of birth,country</p>
                <li>dob means Date of Birth</li>
                <li>Put your Gender as if male:M female:F else:O</li>
                <li>add your phone number in this format countryCode-yournumber</li>

            </div>
            <Footer />
        </>
    )
}

export default About;
