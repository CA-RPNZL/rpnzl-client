import "../styling/Footer.css";
import React from "react";

const Footer = () => (
        <footer id="footer">
            <div id="catchphrase">
                <p>Fairytale hair for magical moments</p>
            </div>

            <div className="container">
                <a href="#" id="footer-logo">
                    RPNZL
                </a>

            </div>
            <div class="social-media">
                <a href="https://www.pinterest.com" target="_blank">
                    <i class="fa-brands fa-pinterest"></i>
                </a>
                <a href="https://www.facebook.com" target="_blank">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank">
                    <i class="fa-brands fa-instagram"></i>
                </a>
            </div>
        </footer>
);

export default Footer;

