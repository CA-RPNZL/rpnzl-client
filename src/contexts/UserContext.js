import { createContext, useContext, useState } from 'react';

// Create a context to manage user authentication state
const UserContext = createContext();

// UserProvider component to wrap the app and provide user context
export const UserProvider = ({ children }) => {
  // State to hold user data
  const [jwt, setJwt] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isHairstylist, setIsHairstylist] = useState(null);



  // Function to handle user login
  const login = (userData) => {
    // Store in response
    setJwt(userData.jwt);
    setUserId(userData.userId);
    setIsAdmin(userData.isAdmin);
    setIsHairstylist(userData.isHairstylist);

    // Store in local storage
    localStorage.setItem("jwt", userData.jwt);
    localStorage.setItem("userId", userData.userId)
    localStorage.setItem("isAdmin", userData.isAdmin)
    localStorage.setItem("isHairstylist", userData.isHairstylist)
  };

  // Function to handle user logout
  const logout = () => {
    // Clear user data on logout
    setJwt(null);
    setUserId(null);
    setIsAdmin(null);
    setIsHairstylist(null);
    localStorage.clear();
  };

  // Provide the user context to the app
  return (
    <UserContext.Provider value={{ jwt, userId, isAdmin, isHairstylist, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context in functional components
export const useUserContext = () => {
  return useContext(UserContext);
};