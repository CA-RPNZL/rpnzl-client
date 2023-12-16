import { Button } from "react-bootstrap";
import "../styling/UserPortalForm.css"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useUserContext } from "../contexts/UserContext";


function PersonalDetailsForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // only save updated fields
        const updatedData = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(mobileNumber && { mobileNumber }),
        };

        try {
            const jwt = localStorage.getItem("jwt");
            const userId = localStorage.getItem("userId")
            const response = await fetch(process.env.REACT_APP_API + "/users/id/" + userId , {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'authtoken': jwt,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            toast.success("Successfully updated personal details.");
            navigate("/userportal");
        } 
        catch (error) {
            console.error(error);
            toast.error("An error occurred while updating details.");
        }
    }

    return (
        <form className="userPortalForm" onSubmit={handleSubmit}>
            <h3>Update Personal Details</h3>
            <input 
                className="formFields" 
                type="text" 
                placeholder='First Name'
                onChange={(event) => setFirstName(event.target.value)}/>
            <input 
                className="formFields" 
                type="text" 
                placeholder='Last Name'
                onChange={(event) => setLastName(event.target.value)}/>
            <input 
                className="formFields" 
                type="text" 
                placeholder='E-mail'
                onChange={(event) => setEmail(event.target.value)}/>
            <input 
                className="formFields" 
                type="text" 
                placeholder='Phone'
                onChange={(event) => setMobileNumber(event.target.value)}/>
            <Button type="submit">Update Details</Button>
        </form>
    )
}

export default PersonalDetailsForm;