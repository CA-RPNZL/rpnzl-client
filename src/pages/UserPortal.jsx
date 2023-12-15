import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import AccountInformation from '../components/AccountInformation';
import Greeting from '../components/Greeting';
import PortalAppointments from '../components/PortalAppointments';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import PasswordForm from '../components/PasswordForm';
import "../styling/UserPortal.css"
import Modal from '../components/Modal';
import { useUserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';


function UserPortal() {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Grab data for JWT
    const { jwt, userId } = useUserContext();

    let navigate = useNavigate();

    // Check if user is logged in before loading user portal
    useEffect(() => {
        // Check if user is logged in
        if (!jwt) {
            // If user is not logged in, direct user to log in
            navigate("/login")
        } else {
            // If user is logged in, direct user to booking form
            navigate("/userportal")
            // Update client ID
            console.log("User ID is: " + userId);
        }
    }, [jwt, navigate, userId])
    
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
                    <Button onClick={() => setOpenDeleteModal(true)}>DELETE ACCOUNT</Button>
                    <Modal 
                        open={openDeleteModal} 
                        onClose={() => setOpenDeleteModal(false)}
                        heading={"Delete Account"}
                        subheading={"Are you sure you want to delete your account?"}
                        text={"Deleting your account will permanently delete your details and appointments."}
                    />
                    <p>Please note: Once account is deleted your upcoming appointments will be deleted too</p>
                </div>
                
            </div>
        </div>
        
    )
}
export default UserPortal