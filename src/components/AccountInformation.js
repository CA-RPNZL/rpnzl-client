import { useEffect, useState } from "react";
import "../styling/AccountInformation.css"
import { UserProvider, useUserContext } from "../contexts/UserContext";

function AccountInformation() {
    const [userData, setUserData] = useState({});

    const { jwt, userId } = useUserContext();

    useEffect (() => {
        const fetchAccountInformation = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/users/id/" + userId);
                
                const responseData = await response.json();
                setUserData(responseData)
                console.log(userId);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAccountInformation();
    }, [jwt, userId]);


    return (
        <div id="accountInfoDiv">
            <h3>Account Information</h3>
            <div id="greenAccountDiv">
                <p>First Name: {userData.firstName}</p>
                <p>Last Name: {userData.lastName}</p>
                <p>E-mail: {userData.email}</p>
                <p>Phone: {userData.mobileNumber}</p>
            </div>
        </div>
    )
}

export default AccountInformation;
