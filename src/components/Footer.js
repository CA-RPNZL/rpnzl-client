import "../styling/Footer.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

const Footer = () => {
    // Reset stored appointment data function
    const {resetAppointment} = useContext(AppointmentContext);

    // Import useNavigate
    const navigate = useNavigate();
    
    // Function to handle link clicks
    const handleClick = (path, event) => {
        event.preventDefault();
        // Navigate to path
        navigate(path);
        // Reset current stored data if service input changes
        resetAppointment();
    };

    return (
        <footer id="footer">
            <div id="catchphrase">
                <p>Fairytale hair for magical moments</p>
            </div>

            <div className="logoContainer">
                <Link onClick={(event) => handleClick("/", event)} id="footer-logo">
                    RPNZL
                </Link>

            </div>
            <div id="social-media">
                <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-pinterest"></i>
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;

