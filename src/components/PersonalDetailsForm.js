import "../styling/UserPortalForm.css"
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Loader from "./Loader";


function PersonalDetailsForm() {
    // State variables to manage form input and loading state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");

    // Make loading animation invisible at first
    const [loading, setLoading] = useState(false)

    // Hook to navigate to different pages
    const navigate = useNavigate();
    
    // Function to handle form submission
    const handleSubmit = async (event) => {
        // Preventing the default form submission behavior
        event.preventDefault();
        
        // Open the loading screen
        setLoading(true);
    
        // Only save updated fields
        const updatedData = {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(mobileNumber && { mobileNumber }),
        };

        try {
            // Retrieving JWT token and user ID from local storage
            const jwt = localStorage.getItem("jwt");
            const userId = localStorage.getItem("userId");
            
            // Making a PATCH request to update the user's personal details
            const response = await fetch(process.env.REACT_APP_API + "/users/id/" + userId, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'authtoken': jwt,
                },
                body: JSON.stringify(updatedData),
            });

            // Handling errors if the response is not successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Parsing the response JSON data
            await response.json();

            // Displaying a success message in a toast notification
            toast.success("Successfully updated personal details.");
            // Navigating to the user portal page
            navigate("/userportal");
        } 
        catch (error) {
            // Logging and displaying an error message in case of an exception
            console.error(error);
            toast.error("An error occurred while updating details.");
        }
        finally {
            // Closing the loading screen
            setLoading(false);
        }
    }

    // Rendering the form with input fields, buttons, and loader component
    return (
        <form className="userPortalForm" onSubmit={handleSubmit}>
            <h3>Update Personal Details</h3>
            {/* Input field for the first name */}
            <input 
                className="formFields" 
                type="text" 
                placeholder='First Name'
                onChange={(event) => setFirstName(event.target.value)}/>
            {/* Input field for the last name */}
            <input 
                className="formFields" 
                type="text" 
                placeholder='Last Name'
                onChange={(event) => setLastName(event.target.value)}/>
            {/* Input field for the email */}
            <input 
                className="formFields" 
                type="text" 
                placeholder='E-mail'
                onChange={(event) => setEmail(event.target.value)}/>
            {/* Input field for the mobile number */}
            <input 
                className="formFields" 
                type="text" 
                placeholder='Phone'
                onChange={(event) => setMobileNumber(event.target.value)}/>
            {/* Button to submit the form */}
            <Button type="submit">Update Details</Button>
            {/* Loader component for indicating loading state */}
            <Loader open={loading}/>
        </form>
    )
}

export default PersonalDetailsForm;
