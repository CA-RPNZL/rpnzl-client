import '../styling/SignUp.css';
import '../styling/PinkButton.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';
import Loader from "../components/Loader";


function SignUp() {
  // React hooks to define state for user inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Create state for loading overlay
  const [loading, setLoading] = useState(false);

  // Navigation hook for URL change
  const navigate = useNavigate();

  // Uses process.env to access environment variables
  const REACT_APP_API = process.env.REACT_APP_API;

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
  
    // Define a regex pattern for a strong password
    const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // Check if password length is under 8
    if (password.length < 8) {
      // Display warning message in the console
      toast.warning("Password must exceed 8 characters.");
      setLoading(false);
      return;
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      // Display error message in the console
      console.error("Password and Confirm Password do not match.");
      toast.error("Password and Confirm Password do not match.");
      setLoading(false);
      return;
    }

    // Check if the password meets the strong password requirements
    if (!strongPasswordRegex.test(password)) {
      // Display error message in the console
      console.error("Password must contain at least one letter, one number, and one symbol.");
      toast.error("Password must contain at least one letter, one number, and one symbol.");
      setLoading(false);
      return;
    }
  
    try {
      // Send POST request to the server to create a new user
      const response = await axios.post(`${REACT_APP_API}/users`, {
        firstName,
        lastName,
        email,
        mobileNumber,
        password,
        confirmPassword,
      });
  
      // Log the server response
      console.log(response.data); 
  
      // Log successful response 
      console.log("Welcome to RPNZL!");
      toast.success("Welcome to RPNZL!");

      // Navigate to login page
      navigate("/login");
    } catch (error) {

      // Log error message on console
      console.error("Error during signup:", error);
  
      if (error.response) {
        // Log server response error to the console / user
        console.error("Server responded with:", error.response.data);
        console.error(error.response.data.message || "Error has occurred");
        toast.error(error.response.data.message || "Error has occurred");
      } else {
        // Log generic error message in console
        console.error("An error occurred during signup");
      }
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div id="signUpContainer">
      <div id="signUpImageDiv">
      </div>
      <div id="signUpFormDiv"> 
        <h2>Sign up</h2> 
        <form id="signUpForm" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="firstName">First Name:</label> 
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)}
              required
            /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="lastName">Last Name:</label> 
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email Address:</label> 
            <input 
              type="text" 
              id="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="mobileNumber">Mobile Number:</label> 
            <input 
              type="number" 
              id="mobileNumber" 
              name="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password:</label> 
            <input 
              type="password" 
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            /> 
          </div>
          <div className="inputGroup">
            <label htmlFor="confirmPassword">Confirm Password:</label> 
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            /> 
          </div>
          <div className="inputGroup"> 
            <button type="submit" id="signUpButton" className="pinkButton">Sign up</button> 
          </div>
        </form>
        <Loader open={loading} />
      </div>
    </div>
  );
}

export default SignUp;