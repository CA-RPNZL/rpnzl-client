import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styling/ReviewCarousel.css'
/*import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
    return (
      <Carousel>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
  
export default UncontrolledExample;*/

function ReviewCarousel() {
    return (  
        <div className="ovalContainer"> 
            <div id="purpleOval">
                <Carousel 
                    axis="horizontal" 
                    showThumbs={false} 
                    showArrows={true}
                    showStatus={false}
                    showIndicators={true}
                    autoPlay
                    infiniteLoop  
                    emulateTouch>
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