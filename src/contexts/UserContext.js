import { createContext, useContext, useState } from 'react';

// Create a context to manage user authentication state
const UserContext = createContext();

// UserProvider component to wrap the app and provide user context
export const UserProvider = ({ children }) => {
  // State to hold user data
  const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState(null);

  // Function to handle user login
  const login = ({ token, ...user }) => {
    setJwt(token);
    setUserData(user);
  };

  // Function to handle user logout
  const logout = () => {
    // Clear user data on logout
    setJwt(null);
    setUserData(null);
  };

  // Function to check if the user is an admin
  const isAdmin = () => {
    return userData?.is_admin;
  };

  // Provide the user context to the app
  return (
    <UserContext.Provider value={{ userData, jwt, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context in functional components
export const useUserContext = () => {
  return useContext(UserContext);
};