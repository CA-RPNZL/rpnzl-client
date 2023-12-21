import "../styling/AccountInformation.css";
import { useEffect, useState } from "react";

function AccountInformation() {

    // State to hold the user data retrieved from the API
    const [userData, setUserData] = useState({});

    // Hook to fetch account information when the component mounts or user data changes
    useEffect (() => {
        // Async function to fetch account information
        const fetchAccountInformation = async () => {
            try {
                // Retrieving JWT token and user ID from the local storage
                const jwt = localStorage.getItem("jwt");
                const userId = localStorage.getItem("userId");

                // GET request to the API endpoint for user information
                let response = await fetch(process.env.REACT_APP_API + "/users/id/" + userId, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      authtoken: jwt
                    },
                });
                
                // Parsing  the response JSON data
                const responseData = await response.json();
                // Setting user data in component state
                setUserData(responseData);
            }

            // Catching any errors during the fetch and logging to console
            catch (error) {
                console.log(error);
            }
        }

        // Calling function
        fetchAccountInformation();
    }, [userData]); // Dependency array to ensure effect runs when userData changes


    return (
        <div id="accountInfoDiv">
            <h3>Account Information</h3>
            {userData ? (
                <div id="greenAccountDiv">
                    <p>First Name: {userData.firstName}</p>
                    <p>Last Name: {userData.lastName}</p>
                    <p>E-mail: {userData.email}</p>
                    <p>Phone: {userData.mobileNumber}</p>
                </div>
            ) : (
                <p>Loading...</p>)}
        </div>
    )
}

export default AccountInformation;
