import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import AccountInformation from '../components/AccountInformation';
import Greeting from '../components/Greeting';
import PortalAppointments from '../components/PortalAppointments';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import PasswordForm from '../components/PasswordForm';
import "../styling/UserPortal.css"
import Modal from '../components/Modal';


function UserPortal() {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    
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