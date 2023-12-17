import { Button } from 'react-bootstrap';
import "../styling/UserPortalForm.css"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

function PasswordForm() {
    const[oldPassword, setOldPassword] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

   
    const handleSubmit = async(event) => {
        console.log("Submitting password form...")
        event.preventDefault();

         // Regex ensures user will create strong password
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        // Check if password length is under 8
        if (newPassword.length < 8) {
            console.log()
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

            const jwt = localStorage.getItem("jwt")
            const userId = localStorage.getItem("userId");
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

            const responseData = await response.json();

            if(responseData.message === "Successfully changed password") {
                toast.success("Successfully changed password");
                localStorage.removeItem("jwt");
                localStorage.removeItem("userId");
                navigate("/login");
            } else if (responseData.message  === "Invalid current password") {
                toast.error("Invalid current password, please try again.");
            } else {
                toast.error("An error occurred");
                console.log("Response message is: ")
                console.log(responseData.message);
            }
        } catch (error) {
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
            <input 
                className="formFields" 
                type="password" 
                id="oldPassword"
                placeholder="Current password"
                onChange={(event) => setOldPassword(event.target.value)}/>
            <input 
                className="formFields" 
                type="password"  
                id="newPassword"
                placeholder="New password"
                onChange={(event) => setNewPassword(event.target.value)}/>
            <input 
                className="formFields" 
                type="password" 
                id="confirmPassword"
                placeholder='Confirm new password'
                onChange={(event) => setConfirmPassword(event.target.value)}/>
            <Button type="submit">Update Password</Button>
        </form>
        </div>
        
    )
}

export default PasswordForm;