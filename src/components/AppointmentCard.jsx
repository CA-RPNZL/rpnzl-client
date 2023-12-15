import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faScissors, faCalendarDays, faPhone, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '../contexts/UserContext';


function AppointmentCard(props) {
    // Grab data from UserContext
    const { isHairstylist } = useUserContext();

    

    return (
        <div id={props.id}>
            <div className="greenApptCards">
                <table>
                    <tbody>
                        <tr>
                            <td><FontAwesomeIcon icon={faScissors} /></td>
                            <td>{props.service.name}</td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faCalendarDays} /></td>
                            <td>{props.bookedDate}<br/>
                                {props.bookedStartTime} - {props.bookedEndTime}
                            </td>
                        </tr>
                        <tr>
                            <td><FontAwesomeIcon icon={faUser} /></td>
                            <td>with {props.hairstylist.firstName} {props.hairstylist.lastName}</td>
                        </tr>
                        {/* If user is hairstylist, show client's name */}
                        { isHairstylist && 
                            <tr>
                                <td><FontAwesomeIcon icon={faUserClock} /></td>
                                <td>for {props.client.firstName} {props.client.lastName}</td>
                            </tr>
                        }
                        {/* If user is hairstylist, show client's phone number */}
                        { isHairstylist && 
                            <tr>
                                <td><FontAwesomeIcon icon={faPhone} /></td>
                                <td>{props.client.mobileNumber}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
   
}

export default AppointmentCard;