import React from 'react';
import '../styling/SignUp.css';
import signUpImage from '../assets/photos/signup_image.jpg';

function SignUp() {
  return (
    <div className="signUpContainer">
        <img className="signUpImage" src={signUpImage} alt="SignUp" />
      <div className="signUpForm"> 
        <h2>SIGN UP</h2> 
        <form>
          <div className="inputGroup">
            <label htmlFor="firstName">First Name:</label> 
            <input type="text" id="firstName" name="username" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="lastName">Last Name:</label> 
            <input type="text" id="lastName" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email Address:</label> 
            <input type="text" id="email" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="mobileNumber">Mobile Number:</label> 
            <input type="number" id="mobileNumber" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password:</label> 
            <input type="password" id="password" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm Password:</label> 
            <input type="password" id="confirmPassword" name="password" /> 
          </div>
          <div className="inputGroup"> 
            <button type="submit" className="signUpButton">SIGN UP</button> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;