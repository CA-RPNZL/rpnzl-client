import "../styling/Booking.css";
import { useContext, useEffect } from "react";
import { formattedAppointmentDate, formattedAppointmentEndTime, formattedAppointmentStartTime } from "../functions/formatDate";
import AppointmentContext from "../contexts/AppointmentContext";


function PreConfirmation() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);
    const {setDisableNextBtn} = useContext(AppointmentContext);

    // Grab data from local storage
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        // Fetch appointment data
        const fetchAppointmentData = async () => {
    
            // If missing client ID (e.g. user is not logged in)
            if (appointment.client === "") {
                console.error("Error: Missing client ID.");
    
                // Update Next button to be disabled
                setDisableNextBtn(true);
            }
        }
        fetchAppointmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[appointment]);

    // Update start date with date formatting
    const selectedDate = formattedAppointmentDate(appointment.selectedStartDateTime);
    
    // Update start date with time formatting
    const selectedStartTime = formattedAppointmentStartTime(appointment.selectedStartDateTime);
    
    // Update end date with time formatting
    const selectedEndTime = formattedAppointmentEndTime(appointment.selectedEndDateTime);



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
                    <p className="preConfirmSelected">{selectedStartTime} - {selectedEndTime} ({appointment.selectedService.duration} minutes)</p>
                </div>
            </div>
    )
}

export default PreConfirmation;