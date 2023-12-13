import { createContext, useContext, useState } from 'react';

// Create a context to manage user authentication state
const UserContext = createContext();

// UserProvider component to wrap the app and provide user context
export const UserProvider = ({ children }) => {
  // State to hold user data
  // const [userData, setUserData] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isHairstylist, setIsHairstylist] = useState(null);

  // Function to handle user login
  const login = (userData) => {
    console.log(userData);
    setJwt(userData.jwt);
    setIsAdmin(userData.isAdmin);
    setIsHairstylist(userData.isHairstylist);
    // setUserData(user);
  };

  // Function to handle user logout
  const logout = () => {
    // Clear user data on logout
    setJwt(null);
    setIsAdmin(null);
    setIsHairstylist(null);
    // setUserData(null);
  };

  // Function to check if the user is an admin
  // const isAdmin = () => {
  //   return userData?.is_admin;
  // };

  // Provide the user context to the app
  return (
    <UserContext.Provider value={{ jwt, isAdmin, isHairstylist, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context in functional components
export const useUserContext = () => {
  return useContext(UserContext);
};