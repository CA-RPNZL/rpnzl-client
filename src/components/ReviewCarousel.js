import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styling/ReviewCarousel.css';

function ReviewCarousel() {
    return (  
        <div className="ovalContainer"> 
            {/* Purple oval background */}
            <div id="purpleOval">
                {/* Carousel component with specified configurations */}
                <Carousel 
                    axis="horizontal" 
                    showThumbs={false} 
                    showArrows={true}
                    showStatus={false}
                    showIndicators={false}
                    autoPlay
                    infiniteLoop  
                    emulateTouch>
                    {/* Individual review slides */}
                    <div className="review">
                        <p>"The best salon in town"</p>
                        <p>- Bianca</p>
                    </div>
                    <div className="review">
                        <p>"Quality services and friendly staff"</p>
                        <p>- Layla</p>
                    </div>
                    <div className="review">
                        <p>"I will keep coming back here"</p>
                        <p>- Dante</p>
                    </div>
                </Carousel>
            </div>
        </div> 
    )
}

export default ReviewCarousel;
