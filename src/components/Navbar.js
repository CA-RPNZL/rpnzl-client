import "../styling/Navbar.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {

    // Grab JWT, logout from User Context
    const { jwt, isAdmin, logout } = useUserContext();

    // Toggle open and close nav bar
    const [toggle, setToggle]= useState(false);


    // Function if a user logs out
    const handleLogOut = () => {
        setToggle(!toggle);
        logout();
    }


    // Create logInLink variable
    let signUpAccountLink;

    // Create logInLink variable
    let logInLink;


    // Set up logic if user is not logged in
    if (!jwt) {
        // If user is not logged in:
        // Show link to sign up page instead of account page
        signUpAccountLink = <Link to="/signup">Sign up</Link>
        // Show link to log in page instead of log out
        logInLink = <Link to="/login">Log in</Link>
    } else {
        // If user is logged in, check if user is admin
        if (isAdmin) {
            signUpAccountLink = <Link to="/admin">Admin</Link>
        } else {
            // Show link to account page instead of sign up
            signUpAccountLink = <Link to="/userportal">Account</Link>
        }
        // Show link to log out instead of log out
        logInLink = <Link to="/" onClick={handleLogOut}>Log out</Link>
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
                        <li><Link to="/about">About</Link></li>
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