import { useContext } from "react";
import "../styling/Booking.css";
import AppointmentContext from "../contexts/AppointmentContext";


function PreConfirmation() {
    const appointment = useContext(AppointmentContext);
    
    const selectedDate = new Date(appointment.startDateTime).toLocaleDateString("en-AU", { dateStyle: "long"});
    const selecteStartTime = new Date(appointment.startDateTime).toLocaleTimeString("en-AU", { timeStyle: "short"});
    const selectedEndTime = new Date(appointment.endDateTime).toLocaleTimeString("en-AU", { timeStyle: "short"});

    return (
            <div id="preConfirmationDiv">
                <h6 id="bookingHeading">Your selections</h6>
                <div id="preConfirmService">
                    <p className="preConfirmHeader">Services</p>
                    <p className="preConfirmSelected">{appointment.selectedService.name}</p>
                </div>
                <div id="preConfirmHairstylist">
                    <p className="preConfirmHeader">Hairstylist</p>
                    <p className="preConfirmSelected">{appointment.selectedHairstylist.firstName} {appointment.selectedHairstylist.lastName}</p>
                </div>
                <div id="preConfirmDateTime">
                    <p className="preConfirmHeader">Date and time</p>
                    <p className="preConfirmSelected">{selectedDate}</p>
                    <p className="preConfirmSelected">{selecteStartTime} - {selectedEndTime} ({appointment.selectedService.duration} minutes)</p>
                </div>
            </div>
    )
}

export default PreConfirmation;