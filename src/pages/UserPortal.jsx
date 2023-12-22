// Importing necessary dependencies and styling
import "../styling/UserPortal.css";
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify'
import AccountInformation from '../components/AccountInformation';
import Greeting from '../components/Greeting';
import PortalAppointments from '../components/PortalAppointments';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import PasswordForm from '../components/PasswordForm';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

// Component for the User Portal page
function UserPortal() {
    // State variables for managing modal and loading states
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // Accessing logout function from the UserContext
    const { logout } = useUserContext();

    // Retrieving user information from local storage
    const jwt = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");

    // Accessing the navigation function from react-router-dom
    const navigate = useNavigate();

    // Function to handle the click on the "Delete Account" button
    const handleDeleteClick = async () => {
        setLoading(true);

        try {
            // Sending a DELETE request to delete the user account
            await fetch(process.env.REACT_APP_API + "/users/id/" + userId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": jwt,
                },
            });

            // Logging out the user and navigating to the home page
            logout();
            navigate("/");
            toast.success("Deleted user successfully");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div id="userPortalOuterDiv">  
            <div className="userPortalDiv">
                <Greeting className="greeting"/>
                <div className="portalAppointments">
                    <PortalAppointments />
                </div>
                <div className="accountInformation">
                    <AccountInformation />
                </div>
                <div id="detailsForm">
                    <PersonalDetailsForm className="personalDetailsForm"/>
                    <PasswordForm />
                </div> 
                <div id="deleteAccountDiv">
                    {/* If delete button clicked, open modal window to confirm */}
                    <Button onClick={() => setOpenDeleteModal(true)}>DELETE ACCOUNT</Button>
                    {/* Modal component for confirming account deletion */}
                    <Modal 
                        open={openDeleteModal} 
                        onClose={() => setOpenDeleteModal(false)}
                        handleClick={() => handleDeleteClick()}
                        heading={"Delete Account"}
                        subheading={"Are you sure you want to delete your account?"}
                        text={"Deleting your account will permanently delete your details and appointments."}
                    />
                    {/* Additional information about account deletion */}
                    <p>Please note: Once the account is deleted, upcoming appointments will be deleted too</p>
                </div>
            </div>
            {/* Loading spinner component */}
            <Loader open={loading}/>
        </div> 
    )
}

export default UserPortal;
