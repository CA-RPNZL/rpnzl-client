import { useContext } from "react";
import "../styling/Booking.css";
import AppointmentContext from "../contexts/AppointmentContext";


function PreConfirmation() {
    const appointment = useContext(AppointmentContext);
    console.log(appointment);

    // Format date
    const formattedDate = new Intl.DateTimeFormat('en-AU', {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(appointment.selectedDate);

    return (
            <div id="preConfirmationDiv">
                <h6 id="bookingHeading">Your selections</h6>
                <div id="preConfirmService">
                    <p className="preConfirmHeader">Services</p>
                    <p className="preConfirmSelected">{appointment.selectedService.name}</p>
                </div>
                <div id="preConfirmHairstylist">
                    <p className="preConfirmHeader">Hairstylist</p>
                    <p className="preConfirmSelected">{appointment.selectedHairstylist.name}</p>
                </div>
                <div id="preConfirmDateTime">
                    <p className="preConfirmHeader">Date and time</p>
                    <p className="preConfirmSelected">{formattedDate}</p>
                    <p className="preConfirmSelected">2:00PM - 4:30PM ({appointment.selectedService.duration} minutes)</p>
                </div>
            </div>
    )
}

export default PreConfirmation;