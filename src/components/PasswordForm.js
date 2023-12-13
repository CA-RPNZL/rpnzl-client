import { Button } from 'react-bootstrap';
import "../styling/UserPortalForm.css"

function PasswordForm() {
    return (
        <form className="userPortalForm">
            <h3>Update Password</h3>
            <input className="formFields" type="password" placeholder='Current password'/>
            <input className="formFields" type="password" placeholder='New password'/>
            <input className="formFields" type="password" placeholder='Confirm new password'/>
            <Button>Update Password</Button>
        </form>
    )
}

export default PasswordForm;