import "../styling/Footer.css";
import { Link } from "react-router-dom";
import React from "react";

const Footer = () => (
        <footer id="footer">
            <div id="catchphrase">
                <p>Fairytale hair for magical moments</p>
            </div>

            <div className="logoContainer">
                <Link to="/" id="footer-logo">
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

export default Footer;

