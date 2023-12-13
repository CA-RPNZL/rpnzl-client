import { useContext } from "react";
import "../styling/Booking.css";
import AppointmentContext from "../contexts/AppointmentContext";


function PreConfirmation() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);
    

    // Hardcoding the client
    const {client, setClient} = useContext(AppointmentContext);

    // Update disableNextBtn
    const {disableNextBtn, setDisableNextBtn} = useContext(AppointmentContext);

    // Fetch appointment data
    const fetchAppointmentData = async () => {

        // If missing client ID (e.g. user is not logged in)
        if (appointment.client === "") {
            let response = await fetch(process.env.REACT_APP_API + "/users/id/6578338c2cf3aad56f6957cc");
            const responseData = await response.json();
            setClient(responseData);

            console.log(responseData);
            appointment.client = responseData;
            console.log("Error: Missing client ID.");
            // Update Next button to be disabled
            // setDisableNextBtn(true);
        }

    }
    fetchAppointmentData();
    
    // Update start date with date formatting
    const selectedDate = new Date(appointment.selectedStartDateTime).toLocaleDateString("en-AU", { dateStyle: "long"});
    
    // Update start date with time formatting
    const selectedStartTime = new Date(appointment.selectedStartDateTime).toLocaleTimeString("en-AU", { timeStyle: "short"});
    
    // Update end date with time formatting
    const selectedEndTime = new Date(appointment.selectedEndDateTime).toLocaleTimeString("en-AU", { timeStyle: "short"});

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