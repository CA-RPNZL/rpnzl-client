import { Link } from "react-router-dom";
import "../styling/Navbar.css";
import React, { useState } from 'react';

const Navbar = () => {
    const [toggle, setToggle]= useState(false);
    
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
                        <li><a href="/about">About</a></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="contactus">Contact Us</Link></li>
                        <li><Link to="/booking">Book Now</Link></li>
                        <li><Link to="/login">Log In</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/userportal">Account</Link></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;