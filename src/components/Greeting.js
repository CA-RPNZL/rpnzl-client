import "../styling/Greeting.css";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Greeting() {
    // State to hold user data retrieved from the API
    const [userData, setUserData] = useState({});

    // Fetch user data for user's name
    useEffect (() => {
        //Async function to fetch user data
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
                
                // Parsing the response JSON data
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
        <div className="greetingDiv">
            <div className="profileIcon">
                <FontAwesomeIcon icon={faCircleUser} size="2xl"/>
            </div>
            <p id="greeting">Hello, {userData.firstName}</p>

        </div>
    )
}

export default Greeting;