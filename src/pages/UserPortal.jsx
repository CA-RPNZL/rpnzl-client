import "../styling/UserPortal.css"
import React, {useState} from 'react';
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


function UserPortal() {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { logout } = useUserContext();
    const jwt = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const handleDeleteClick = async () => {
        setLoading(true);

        try {
            await fetch(process.env.REACT_APP_API + "/users/id/" + userId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": jwt,
                },
            });
            logout();
            navigate("/")
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
                    <Modal 
                        open={openDeleteModal} 
                        onClose={() => setOpenDeleteModal(false)}
                        handleClick={() => handleDeleteClick()}
                        heading={"Delete Account"}
                        subheading={"Are you sure you want to delete your account?"}
                        text={"Deleting your account will permanently delete your details and appointments."}
                    />
                    <p>Please note: Once account is deleted your upcoming appointments will be deleted too</p>
                </div>
                
            </div>
            <Loader open={loading}/>
        </div> 
    )
}

export default UserPortal