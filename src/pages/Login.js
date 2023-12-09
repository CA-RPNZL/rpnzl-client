// Import dependencies and styles
import React from 'react';
import '../styling/Login.css'; // Import the associated styling

// Functional component for the Login page
function Login() {
  return (
    <div className="login-container"> {/* Container for the entire login page */}
      <div className="login-form"> {/* Container for the login form */}
        <h2>Login</h2> 
        <form>
          <div className="input-group"> {/* Container for the username input */}
            <label htmlFor="username">Username:</label> 
            <input type="text" id="username" name="username" /> 
          </div>
          <div className="input-group"> {/* Container for the password input */}
            <label htmlFor="password">Password:</label> 
            <input type="password" id="password" name="password" /> 
          </div>
          <div className="input-group"> {/* Container for the submit button */}
            <button type="submit" className="loginButton">Submit</button> 
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login; // Export the Login component