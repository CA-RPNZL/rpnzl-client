import { Button } from 'react-bootstrap';
import AccountInformation from '../components/AccountInformation';
import Greeting from '../components/Greeting';
import PortalAppointments from '../components/PortalAppointments';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import PasswordForm from '../components/PasswordForm';
import "../styling/UserPortal.css"


function UserPortal() {
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
                    <Button>DELETE ACCOUNT</Button>
                    <p>Please note: Once account is deleted your upcoming appointments will be deleted too</p>
                </div>
                
            </div>
        </div>
        
    )
}
export default UserPortal