import { createContext, useContext, useState } from 'react';

// Create a context to manage user authentication state
const UserContext = createContext();

// UserProvider component to wrap the app and provide user context
export const UserProvider = ({ children }) => {
  // State to hold user data
  const [user, setUser] = useState(null);

  // Function to handle user login
  const login = (token) => {
    setUser({ token });
  };

  // Function to handle user logout
  const logout = () => {
    // Clear user data on logout
    setUser(null);
  };

  // Provide the user context to the app
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context in functional components
export const useUserContext = () => {
  return useContext(UserContext);
};