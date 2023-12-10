import "../styling/Booking.css";
import successImage from '../assets/success.png';
import { useContext } from "react";
import AppointmentContext from "../contexts/AppointmentContext";


function Confirmation() {
    const appointment = useContext(AppointmentContext);

    // Format date
    const formattedDate = new Intl.DateTimeFormat('en-AU', {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(appointment.selectedDate);

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
                        <p className="confirmedSelected">{appointment.selectedHairstylist.name}</p>
                    </div>
                    <div id="confirmedDateTime">
                        <p className="confirmedHeader">Date and time</p>
                        <p className="confirmedSelected">{formattedDate}</p>
                        <p className="confirmedSelected">2:00PM - 4:30PM ({appointment.selectedService.duration} minutes)</p>
                    </div>
                </div>
            </div>
    )
}

export default Confirmation;