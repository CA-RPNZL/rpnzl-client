import { Button } from "react-bootstrap";
import "../styling/UserPortalForm.css"

function PersonalDetailsForm() {
    return (
        <form className="userPortalForm">
            <h3>Update Personal Details</h3>
            <input className="formFields" type="text" placeholder='First Name'/>
            <input className="formFields" type="text" placeholder='Last Name'/>
            <input className="formFields" type="text" placeholder='E-mail'/>
            <input className="formFields" type="text" placeholder='Phone'/>
            <Button>Update Details</Button>
        </form>
    )
}

export default PersonalDetailsForm;