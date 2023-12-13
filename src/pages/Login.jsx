// Import dependencies and styles
import React, {useState} from 'react';
import '../styling/Login.css';
import { useUserContext } from '../contexts/UserContext';

import loginImage from '../assets/photos/login_image.jpg';

// Functional component for the Login page
function Login() {
  const { login } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Sending login request...');
  
      // Call authentication API
      const result = await fetch(process.env.REACT_APP_API + "/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log('Received response:', result);
  
      if (result.ok) {
        const userData = await result.json();
        console.log('Authentication successful. User data:', userData);
        
        // Return API token, and additional user data
        login(userData);
      } else {
        console.log('Authentication failed. Status:', result.status);
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('An error occurred during authentication');
    }
  };


  return (
    <div className="loginContainer">
      <img className="loginImage" src={loginImage} alt="Login" />
      <div className="loginForm"> {/* Container for the login form */}
        <h2>Login</h2> 
        <form onSubmit={handleLogin}>
          <div className="inputGroup"> {/* Container for the username input */}
            <label htmlFor="username">Username:</label> 
            <input type="text" 
            id="username" 
            name="username" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            /> 
          </div>
          <div className="inputGroup"> {/* Container for the password input */}
            <label htmlFor="password">Password:</label> 
            <input type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            /> 
            {error && <p className="error-message">{error}</p>}
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