import { Button } from 'react-bootstrap';
import "../styling/UserPortalForm.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

function PasswordForm() {
    // State variables to manage form input and loading state
    const[oldPassword, setOldPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async(event) => {
        // Preventing the default form submission behavior
        console.log("Submitting password form...")
        event.preventDefault();

         // Regex ensures user will create strong password
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        // Check if password length is under 8
        if (newPassword.length < 8) {
            // Display warning message in the console
            toast.warning("Password must exceed 8 characters.");
            return;
        }
  
        // Check if password and confirmPassword match
        if (newPassword !== confirmPassword) {
            // Display error message in the console
            console.error("Password and Confirm Password do not match.");
            toast.error("Password and Confirm Password do not match.");
            return;
        }

        // Check if the password meets the strong password requirements
        if (!strongPasswordRegex.test(newPassword)) {
            // Display error message in the console
            console.error("Password must contain at least one letter, one number, and one symbol.");
            toast.error("Password must contain at least one letter, one number, and one symbol.");
            return;
        }
        try {
            setLoading(true);
            
            // Retrieving JWT token and user ID from local storage
            const jwt = localStorage.getItem("jwt")
            const userId = localStorage.getItem("userId");
            // Making a PATCH request to update the user's password
            const response = await fetch(process.env.REACT_APP_API + '/changepassword/' + userId, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': jwt,
                },
                  body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                }),
            })
            
            // Parsing the response JSON data
            const responseData = await response.json();

            // Handling different scenarios based on the response message
            if(responseData.message === "Successfully changed password") {
                toast.success("Successfully changed password");
                // Clearing JWT token and user ID from local storage
                localStorage.removeItem("jwt");
                localStorage.removeItem("userId");
                // Navigating to the login page
                navigate("/login");
            } else if (responseData.message  === "Invalid current password") {
                toast.error("Invalid current password, please try again.");
            } else {
                toast.error("An error occurred");
                console.log("Response message is: ")
                console.log(responseData.message);
            }
        } catch (error) {
            // Logging and displaying an error message in case of an exception
            console.error(error);
            toast.error("An error occurred");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}className="userPortalForm">
            <h3>Update Password</h3>
             {/* Input field for the old password */}
            <input 
                className="formFields" 
                type="password" 
                id="oldPassword"
                placeholder="Current password"
                onChange={(event) => setOldPassword(event.target.value)}/>
                {/* Input field for the new password */}
            <input 
                className="formFields" 
                type="password"  
                id="newPassword"
                placeholder="New password"
                onChange={(event) => setNewPassword(event.target.value)}/>
                  {/* Input field for confirming the new password */}
            <input 
                className="formFields" 
                type="password" 
                id="confirmPassword"
                placeholder='Confirm new password'
                onChange={(event) => setConfirmPassword(event.target.value)}/>
             {/* Button to submit the form */}
            <Button type="submit">Update Password</Button>
            {/* Loader component for indicating loading state */}
            <Loader open={loading}/>
        </form>
        </div>
        
    )
}

export default PasswordForm;