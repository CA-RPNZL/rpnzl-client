import "../styling/Booking.css";
import { useContext } from "react";
import successImage from '../assets/success.png';
import AppointmentContext from "../contexts/AppointmentContext";
import { formattedAppointmentDate, formattedAppointmentEndTime, formattedAppointmentStartTime } from "../functions/formatDate";


function Confirmation() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);
    
    // Update start date with date formatting
    const selectedDate = formattedAppointmentDate(appointment.selectedStartDateTime);
    
    // Update start date with time formatting
    const selectedStartTime = formattedAppointmentStartTime(appointment.selectedStartDateTime);
    
    // Update end date with time formatting
    const selectedEndTime = formattedAppointmentEndTime(appointment.selectedEndDateTime);



    return (
            <div id="confirmationDiv">
                <h6 id="bookingHeading">Booking confirmed</h6>
                <div id="bookingSuccessImage">
                    <img src={successImage} alt="Booking confirmed" />
                </div>
                <div id="confirmationDetails">
                    <div id="confirmedService">
                        <p className="confirmedHeader">Services</p>
                        <p className="confirmedSelected">{appointment.selectedService.name}</p>
                    </div>
                    <div id="confirmedHairstylist">
                        <p className="confirmedHeader">Hairstylist</p>
                        <p className="confirmedSelected">{appointment.selectedHairstylist.firstName} {appointment.selectedHairstylist.lastName}</p>
                    </div>
                    <div id="confirmedDateTime">
                        <p className="confirmedHeader">Date and time</p>
                        <p className="confirmedSelected">{selectedDate}</p>
                        <p className="confirmedSelected">{selectedStartTime} - {selectedEndTime} ({appointment.selectedService.duration} minutes)</p>
                    </div>
                </div>
            </div>
    )
}

export default Confirmation;