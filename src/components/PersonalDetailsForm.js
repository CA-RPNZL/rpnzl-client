import "../styling/UserPortalForm.css"
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "./Loader";


function PersonalDetailsForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    // Make loading animation invisible at first
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // open the loading screen
        setLoading(true);
    
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

            await response.json();

            toast.success("Successfully updated personal details.");
            navigate("/userportal");
        } 
        catch (error) {
            console.error(error);
            toast.error("An error occurred while updating details.");
        }
        finally {
            setLoading(false);
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
            <Loader open={loading}/>
        </form>
    )
}

export default PersonalDetailsForm;