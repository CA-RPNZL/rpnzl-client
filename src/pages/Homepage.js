import React from 'react';
import heroImage from '../assets/photos/hero_image.jpg';
import '../styling/Homepage.css';
import ReviewCarousel from '../components/ReviewCarousel';
import BookNowButton from '../components/BookNowButton'


function Homepage() {
    return (
        <div>
            <div id="heroImageDiv">
                <img src={heroImage} id="heroImage"/>
                <BookNowButton className="bookNowButton"/>
            </div>
            <ReviewCarousel />
        </div>
    )
}

export default Homepage;