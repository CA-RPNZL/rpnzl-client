import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faScissors, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
function AppointmentCard() {
    return (
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
    )
   
}

export default AppointmentCard;