import React from 'react';
import '../assets/photos/signup_image.jpg';

function SignUp() {
  return (
    <div className="signUpContainer">
       <div className="signUpImageContainer">
        <img className="signUpImage" src="../assets/photos/signup_image.jpg" alt="SignUp" />
      </div>
      <div className="signUpForm"> 
        <h2>Sign Up</h2> 
        <form>
          <div className="inputGroup">
            <label htmlFor="username">First Name:</label> 
            <input type="text" id="firstName" name="username" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Last Name:</label> 
            <input type="text" id="lastName" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Email Address:</label> 
            <input type="text" id="email" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Mobile Number:</label> 
            <input type="number" id="mobileNumber" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password:</label> 
            <input type="password" id="password" name="password" /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Confirm Password:</label> 
            <input type="password" id="confirmPassword" name="password" /> 
          </div>
          <div className="inputGroup"> 
            <button type="submit" className="SignUpButton">Sign Up</button> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;