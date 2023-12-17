import "../styling/Greeting.css";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Greeting() {
    const [userData, setUserData] = useState({});

    // Fetch user data for user's name
    useEffect (() => {
        const fetchAccountInformation = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                const userId = localStorage.getItem("userId");
                let response = await fetch(process.env.REACT_APP_API + "/users/id/" + userId, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      authtoken: jwt
                    },
                });
                
                const responseData = await response.json();
                setUserData(responseData);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAccountInformation();
    }, [userData]);

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