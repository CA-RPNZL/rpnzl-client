import { useEffect, useState } from "react";
import "../styling/AccountInformation.css"
import { useUserContext } from "../contexts/UserContext";

function AccountInformation() {
    const [userData, setUserData] = useState({});


    useEffect (() => {
        const fetchAccountInformation = async () => {
            try {
                const jwt = localStorage.getItem("jwt");
                const userId = localStorage.getItem("userId")
                let response = await fetch(process.env.REACT_APP_API + "/users/id/" + userId, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${jwt}`,
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
