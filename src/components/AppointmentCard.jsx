import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faScissors, faCalendarDays } from '@fortawesome/free-solid-svg-icons';


function AppointmentCard(props) {

    

    
    return (
        <div>
        <div className="greenApptCards">
            <table>
                <tbody>
                    <tr>
                        <td><FontAwesomeIcon icon={faScissors} /></td>
                        <td>{props.service}</td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faCalendarDays} /></td>
                        <td>{props.bookedDate}<br/>
                            {props.bookedStartTime} - {props.bookedEndTime}
                        </td>
                    </tr>
                    <tr>
                        <td><FontAwesomeIcon icon={faUser} /></td>
                        <td>with {props.hairstylist}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    
    </div>
    )
   
}

export default AppointmentCard;