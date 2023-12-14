import { Link } from "react-router-dom";
import "../styling/Navbar.css";
import React, { useState } from 'react';
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
    // Toggle open and close nav bar
    const [toggle, setToggle]= useState(false);

    // JWT
    const { jwt } = useUserContext();
    console.log(jwt)

    // Create logInLink variable
    let logInLink;

    // Logged in / log out link
    if (!jwt) {
        // Show link to log in page
         logInLink = <Link to="/login">Log in</Link>
    } else {
        // Show link to log out
        logInLink = <Link to="/">Log out</Link>
    }

    // Create logInLink variable
    let signUpAccountLink;

    // Sign up / Account link
    if (!jwt) {
        // Show link to sign up page
        signUpAccountLink = <Link to="/signup">Sign up</Link>
    } else {
        // Show link to account page
        signUpAccountLink = <Link to="/userportal">Account</Link>
    }
    
    return (
        <div id="navHeader">
            <header id="header">
                <div className="container">
                    <Link to="/" id="logo">
                        RPNZL
                    </Link>
                </div>
                <div id="menu" onClick={() => setToggle(!toggle)}>
                    <i id="menu-button" className={toggle ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <nav> 
                    <ul id="navbar" className={toggle ? "#navbar open" : "#navbar"}>
                        <li><a href="#">About</a></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="contactus">Contact Us</Link></li>
                        <li><Link to="/booking">Book Now</Link></li>
                        <li>{signUpAccountLink}</li>
                        <li>{logInLink}</li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;