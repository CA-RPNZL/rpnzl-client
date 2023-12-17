import "../styling/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { useUserContext } from "../contexts/UserContext";
import AppointmentContext from "../contexts/AppointmentContext";

const Navbar = () => {
    // Toggle open and close nav bar
    const [toggle, setToggle]= useState(false);

    // Grab logout from User Context
    const { logout } = useUserContext();

    // Grab JWT from local storage
    const jwt = localStorage.getItem("jwt");

    // Grab isAdmin from local storage
    const isAdmin = localStorage.getItem("isAdmin");

    // Import useNavigate
    const navigate = useNavigate();

    // Reset stored appointment data function
    const {resetAppointment, setAppId} = useContext(AppointmentContext);


    // Function if a user logs out
    const handleLogOut = () => {
        // Close navigation menu
        setToggle(!toggle);
        // Reset current stored data if service input changes
        resetAppointment();
        // Log out user
        logout();
    }

    // Function to handle link clicks
    const handleClick = (path, event) => {
        event.preventDefault();
        // Navigate to path
        navigate(path);
        // Close navigation menu
        setToggle(!toggle);
        // Reset current stored data if service input changes
        resetAppointment();
        // Reset appId
        setAppId(null);
    }

    // Function to handle link clicks
    const handleLogoClick = (path, event) => {
        event.preventDefault();
        // Navigate to path
        navigate(path);
        // Reset current stored data if service input changes
        resetAppointment();
        // Reset appId
        setAppId(null);
    }


    // Create logInLink variable
    let signUpAccountLink;

    // Create logInLink variable
    let logInLink;


    // Set up logic if user is not logged in
    if (!jwt) {
        // If user is not logged in:
        // Show link to sign up page instead of account page
        signUpAccountLink = <Link onClick={(event) => handleClick("/signup", event)}>Sign up</Link>
        // Show link to log in page instead of log out
        logInLink = <Link onClick={(event) => handleClick("/login", event)}>Log in</Link>
    } else {
        // If user is logged in, check if user is admin
        if (isAdmin === "true") {
            // Show link to account page instead of sign up
            signUpAccountLink = <Link onClick={(event) => handleClick("/admin", event)}>Admin</Link>
        } else {
            signUpAccountLink = <Link onClick={(event) => handleClick("/userportal", event)}>Account</Link>
        }
        // Show link to log out instead of log out
        logInLink = <Link to="/" onClick={handleLogOut}>Log out</Link>
    }
    
    return (
        <div id="navHeader">
            <header id="header">
                <div className="container">
                    <Link onClick={(event) => handleLogoClick("/", event)} id="logo">
                        RPNZL
                    </Link>
                </div>
                <div id="menu" onClick={() => setToggle(!toggle)}>
                    <i id="menu-button" className={toggle ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <nav> 
                    <ul id="navbar" className={toggle ? "#navbar open" : "#navbar"}>
                        <li><Link onClick={(event) => handleClick("/about", event)}>About</Link></li>
                        <li><Link onClick={(event) => handleClick("/services", event)}>Services</Link></li>
                        <li><Link onClick={(event) => handleClick("/contactus", event)}>Contact us</Link></li>
                        <li><Link onClick={(event) => handleClick("/booking", event)}>Book now</Link></li>
                        <li>{signUpAccountLink}</li>
                        <li>{logInLink}</li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;