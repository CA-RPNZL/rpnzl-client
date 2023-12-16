import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styling/HairdresserSection.css';
import BookNowButton from "./BookNowButton";

// Hairstylist one images
import hairstylist_three from "../assets/photos/hairstylist_three.png";
import HS1_1 from "../assets/photos/HS1_1.jpg";
import HS1_2 from "../assets/photos/HS1_2.jpg";
import HS1_3 from "../assets/photos/HS1_3.jpg";

// Hairstylist two images
import Hairstylist_two from "../assets/photos/Hairstylist_two.png";
import HS2_1 from "../assets/photos/HS2_1.jpg";
import HS2_2 from "../assets/photos/HS2_2.jpg";
import HS2_3 from "../assets/photos/HS2_3.jpg";

// Hairstylist three images
import Hairstylist_one from "../assets/photos/Hairstylist_one.png";
import HS3_1 from "../assets/photos/HS3_1.jpg";
import HS3_2 from "../assets/photos/HS3_2.jpg";
import HS3_3 from "../assets/photos/HS3_3.jpg";

const Hairdresser = ({ name, image, photos, bio, services }) => (
  <div className="hairdresser-container">
    {/* Bio section */}
    <div className="hairdresser-bio">
      <div className="hairdresserName">
        <h1>{name}</h1>
      </div>
      <div className="hairdresserBio">
        <p>{bio}</p>
      </div>
      <div className="hairdresserService">
        <p>{services}</p>
      </div>
    </div>

    {/* Carousel section */}
    <div className="carouselContainer">
      <div className={`hairdresser ${name.toLowerCase()}`}>
        <Carousel
          showThumbs={false}
          showIndicators={true}
          showStatus={false}
          useKeyboardArrows
        >
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
  </div>
);

function HairdresserComponent() {
  const hairdressers = [
    {
      name: "Michelle",
      image: hairstylist_three,
      photos: [HS1_1, HS1_2, HS1_3],
      bio:
        "Meet Michelle! With years of experience in the hairdressing world, her journey reflects a dedication to perfecting her craft. Michelle's passion goes beyond hairstyles; it's about creating a personalized experience for every client. Step into Michelle's chair at RPNZL and let her history in the industry transform your hair.",
      services:
        "Michelle is your go-to expert for precision haircuts. With a keen eye for the latest trends, she crafts styles that perfectly match your personality. Whether it's a chic bob or a daring pixie cut, Michelle delivers confidence through impeccable cuts.",
    },
    {
      name: "Rachel",
      image: Hairstylist_two,
      photos: [HS2_1, HS2_2, HS2_3],
      bio:
      "Say hi to Rachel! Hailing from America, Rachel brings a wealth of experience from years spent working on movie sets. Her hairstyling journey is intertwined with the glamour of the film industry, where precision and creativity are non-negotiable.",
      services:
      "Rachel is the master of hair colour transformations. With a keen sense of creativity and a palette of vibrant hues, she specialises in crafting personalised and stunning hair colours. Whether you're yearning for a bold change, subtle highlights, or a complete transformation, Rachel is your go-to expert.",
    },
    {
      name: "Angela",
      image: Hairstylist_one,
      photos: [HS3_1, HS3_2, HS3_3],
      bio:
      "This is Angela, our perm specialist! With a rich background as an apprentice to renowned hairdressers in the fashion industry, Angela brings a wealth of experience having worked with an extensive clientele. Making a bold move to Australia a few years ago for a new chapter, Angela brings an international touch to our salon.",
      services:
      "Angela is an expert in creating beautiful, bouncy curls through the art of perms. With a commitment to enhancing your natural beauty, she specialises in delivering gorgeous and long-lasting curls. Whether you're after loose waves or tight coils, Angela’s skill and precision ensure a stunning perm tailored to your preferences.",
    },
  ];

  return (
    <div className="hairdresser-component">
      {hairdressers.map((hairdresser, index) => (
        <Hairdresser key={index} {...hairdresser} />
      ))}
        <BookNowButton className="bookNowButton" />
    </div>
  );
}


export default HairdresserComponent;

