import React from "react";
import '../styling/Aboutpage.css';
import Hairdressers from "../components/HairdresserInfo";
import teamImage from "../assets/photos/team_photo.jpg";
import BookNowButton from "../components/BookNowButton";
import AboutCarousel from "../components/AboutCarousel";

function Aboutpage() {
  return (
    <div>
      <div id="aboutHeading">
        <h1>About <span>RPNZL</span> </h1>
      </div>
      <div className="aboutContainer">
        <div id="aboutPara">
          <p>Welcome to RPNZL, where we create fairytale hair for your everyday magical moments!
            Our salon boasts three skilled hairdressers dedicated to crafting the perfect look
            for you. From precision haircuts to vibrant colouring and glamorous perms, RPNZL
            offers a personalised experience using high-quality products. Step into our salon
            to relax and let our team transform your hair. Book your appointment today for a
            journey to magical locks at RPNZL.</p>
          <BookNowButton className="bookNowButton" />
        </div>
      </div>
      <div className="aboutTeamImage"> 
        <div className="image-container">
          <img src={teamImage} className="teamImage" alt="RPNZLTeam" />
        </div>
      </div>
      <div>
        <div className="meetTeamContainer">
          <div id="meetTeamText">
            <p>Meet the <span>RPNZL</span> team</p>
          </div>
        </div>
        <AboutCarousel />
        <Hairdressers />
      </div>
    </div>
  )
}

export default Aboutpage;
