import { useEffect, useState } from "react";
import "../styling/AccountInformation.css"

function AccountInformation() {
    const [userData, setUserData] = useState({});

    useEffect (() => {
        const fetchAccountInformation = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/users/id/656f1c1d32569c9ead6025b9");
                
                const responseData = await response.json();
                setUserData(responseData)
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAccountInformation();
    }, []);


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
