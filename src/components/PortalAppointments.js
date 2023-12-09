import { Button } from 'react-bootstrap';
import "../styling/PortalAppointments.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faScissors, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

function PortalAppointments() {
    return (
        <div id="portalApptsDiv">
            <h2 id="yourNextApptIs">Your next appointment is</h2>
            <div className="greenApptCards">
                <table>
                    <tbody>
                        <tr>
                            <td><FontAwesomeIcon icon={faScissors} /></td>
                            <td>Colour and Cut</td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faCalendarDays} /></td>
                            <td>November 20, 2023<br/>
                                2:00PM - 4:30PM
                            </td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faUser} /></td>
                            <td>with Michelle Smith</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
            <div id="apptButtonDiv">
                <Button className="apptButtons">Update Appointment</Button>
                <Button className="apptButtons">Cancel Appointment</Button>
            </div>
            <p>Please note: Changes or cancellations must be made no less 
than 24 hours prior to your appointment</p>
        </div>
    )
}

export default PortalAppointments;