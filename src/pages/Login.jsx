// Import dependencies and styles
import React from 'react';
import '../styling/Login.css';

import loginImage from '../assets/photos/login_image.jpg';

// Functional component for the Login page
function Login() {
  return (
    <div className="loginContainer">
      <img className="loginImage" src={loginImage} alt="Login" />
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

// Export the Login component
export default Login;