import { Button } from "react-bootstrap";
import "../styling/UserPortalForm.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PersonalDetailsForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    

        const updatedData = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(mobileNumber && { mobileNumber }),
        };

        try {
            const response = await fetch(process.env.REACT_APP_API + "/users/id/6578349c89c5f2baff440d1c" , {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer `,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            navigate("/userportal");
            window.location.reload();
        } 
        catch (error) {
          console.error('Error updating user details:', error);
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