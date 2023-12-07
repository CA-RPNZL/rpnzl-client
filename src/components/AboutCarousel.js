import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styling/AboutCarousel.css";

// Import Michelle's images
import hairstylist_three from "../assets/photos/hairstylist_three.png";
import HS1_1 from "../assets/photos/HS1_1.jpg";
import HS1_2 from "../assets/photos/HS1_2.jpg";
import HS1_3 from "../assets/photos/HS1_3.jpg";

// Import Rachel's images
import Hairstylist_two from "../assets/photos/Hairstylist_two.png";
import HS2_1 from "../assets/photos/HS2_1.jpg";
import HS2_2 from "../assets/photos/HS2_2.jpg";
import HS2_3 from "../assets/photos/HS2_3.jpg";


// Import Anglea's images
import Hairstylist_one from "../assets/photos/Hairstylist_one.png";
import HS3_1 from "../assets/photos/HS3_1.jpg";
import HS3_2 from "../assets/photos/HS3_2.jpg";
import HS3_3 from "../assets/photos/HS3_3.jpg";

const Hairdresser = ({ name, image, photos }) => (
    <div className="carouselContainer">
        <div className={`hairdresser ${name.toLowerCase()}`}>
        <Carousel
            showThumbs={false}
            showIndicators={true}
            showStatus={false}
            useKeyboardArrows>
            <div className="hairdresser-info">
            <img src={image} alt={`${name} hairdresser`} />
            <p>- {name}</p>
            </div>
            {photos.map((photo, index) => (
            <div className="hairdresserPhotos" key={index}>
                <img src={photo} alt={`Hairstyle ${index + 1}`} />
            </div>
            ))}
        </Carousel>
        </div>
    </div>   
  );
  
  function AboutCarousel() {
    const hairdressers = [
      {
        name: "Michelle",
        image: hairstylist_three,
        photos: [HS1_1, HS1_2, HS1_3],
      },
      {
        name: "Rachel",
        image: Hairstylist_two,
        photos: [HS2_1, HS2_2, HS2_3],
      },
      {
        name: "Angela",
        image: Hairstylist_one,
        photos: [HS3_1, HS3_2, HS3_3],
      },
    ];
  
    return (
      <div className="about-carousel">
        {hairdressers.map((hairdresser, index) => (
          <Hairdresser key={index} {...hairdresser} />
        ))}
      </div>
    );
  }
  
  export default AboutCarousel;