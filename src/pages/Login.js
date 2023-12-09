// Import dependencies and styles
import React from 'react';
import '../styling/Login.css'; // Import the associated styling
import '../assets/photos/login_image.jpg'

// Functional component for the Login page
function Login() {
  return (
    <div className="loginContainer">
      {/* Imgae for login screen */}
       <div className="imageContainer">
        <img className="loginImage" src="../assets/photos/login_image.jpg" alt="Login" />
      </div>
      <div className="loginForm"> {/* Container for the login form */}
        <h2>Login</h2> 
        <form>
          <div className="inputGroup"> {/* Container for the username input */}
            <label htmlFor="username">Username:</label> 
            <input type="text" id="username" name="username" /> 
          </div>
          <div className="inputGroup"> {/* Container for the password input */}
            <label htmlFor="password">Password:</label> 
            <input type="password" id="password" name="password" /> 
          </div>
          <div className="inputGroup"> {/* Container for the submit button */}
            <button type="submit" className="loginButton">Submit</button> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; // Export the Login component