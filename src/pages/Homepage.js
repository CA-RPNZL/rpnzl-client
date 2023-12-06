import React from 'react';
import '../styling/Homepage.css';
import ReviewCarousel from '../components/ReviewCarousel';
import BookNowButton from '../components/BookNowButton'


function Homepage() {
    return (
        <div id="homePage">
            <div id="heroImageDiv">
                <BookNowButton className="bookNowButton"/>
            </div>
            <ReviewCarousel />
        </div>
    )
}

export default Homepage;