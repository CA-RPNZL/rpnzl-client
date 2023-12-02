import React from 'react';
import Button from 'react-bootstrap/Button';
import heroImage from '../assets/photos/hero_image.jpg';
import '../styling/Homepage.css';


function Homepage() {
    return (
        <div>
            <div id="heroImageDiv">
                <img src={heroImage} id="heroImage"/>
                <Button className="bookNowButton">BOOK NOW</Button>
            </div>

        </div>
    )
}

export default Homepage;