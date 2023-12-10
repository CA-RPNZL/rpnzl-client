import "../styling/Footer.css";
import React from "react";

const Footer = () => (
        <footer id="footer">
            <div id="catchphrase">
                <p>Fairytale hair for magical moments</p>
            </div>

            <div className="logoContainer">
                <a href="#" id="footer-logo">
                    RPNZL
                </a>

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

