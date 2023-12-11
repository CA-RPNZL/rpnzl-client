import "../styling/Booking.css";
import successImage from '../assets/success.png';
import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";


function Confirmation() {
    const appointment = useContext(AppointmentContext);
    
    const selectedDate = new Date(appointment.startDateTime).toLocaleDateString("en-AU", { dateStyle: "long"});
    const selecteStartTime = new Date(appointment.startDateTime).toLocaleTimeString("en-AU", { timeStyle: "short"});
    const selectedEndTime = new Date(appointment.endDateTime).toLocaleTimeString("en-AU", { timeStyle: "short"});

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
                        <p className="confirmedSelected">{selecteStartTime} - {selectedEndTime} ({appointment.selectedService.duration} minutes)</p>
                    </div>
                </div>
            </div>
    )
}

export default Confirmation;