import "../styling/Navbar.css";
import React, { Component, useState } from 'react';

const Navbar = () => {
    const [toggle, setToggle]= useState(false);
    
    return (
        <div>
            <header id="header">
                <div className="container">
                    <a href="#" id="logo">
                        RPNZL
                    </a>
                </div>
                <div id="menu" onClick={() => setToggle(!toggle)}>
                    <i id="menu-button" className={toggle ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <nav> 
                    <ul id="navbar" className={toggle ? "#navbar open" : "#navbar"}>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Book Now</a></li>
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">Account</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;