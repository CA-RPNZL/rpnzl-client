import "../styling/Booking.css";
import { useContext, useEffect, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";
import { DateSlotPicker } from "react-dateslot-picker";
// import 'react-dateslot-picker/dist/style.css';


function SelectDateTime() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);

    // Create state for list of existing appointments
    const [appointmentList, setAppointmentList] = useState([]);

    // Update AppointmentContext with selected start date and time
    const {selectedStartDateTime, setStartDateTime} = useContext(AppointmentContext);
    
    // Update AppointmentContext with calcualted end date and time
    const {selectedEndDateTime, setEndDateTime} = useContext(AppointmentContext);
    
    // Update disableNextBtn
    const {disableNextBtn, setDisableNextBtn} = useContext(AppointmentContext);
    

    // Create an array to store unavailable date/time timestamps
    const unavailableDates = [];

    // Fetch list of appointments by selected hairstylist
    useEffect(() => {
        const fetchHairstylistsAppointments = async () => {
            try {
                // If hairstylist has been selected, grab existing appointment data
                if (appointment.selectedHairstylist._id !== "" && appointment.selectedHairstylist._id !== "Any") {
                    // Fetch data from API
                    let response = await fetch(process.env.REACT_APP_API + "/appointments?hairstylist=" + appointment.selectedHairstylist._id);
                    // Save data as json
                    const responseData = await response.json();
                    // Update state
                    setAppointmentList(responseData);
                } else {
                    console.log("No hairstylist has been selected.")
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchAppointmentData = async () => {
            if (selectedStartDateTime !== "") {
                // Update Next button to be active
                setDisableNextBtn(false);
            } else {
                // Update Next button to be disabled
                setDisableNextBtn(true);
            }
        };

        fetchHairstylistsAppointments();
        fetchAppointmentData();


    }, [appointment.selectedHairstylist, selectedStartDateTime, setDisableNextBtn])


    // Grab date/time from each appointment, convert to timestamp
    appointmentList.map((bookedAppt) => {

        // Obtain timestamp of the starting date/time of the booked appointment
        let bookedApptStartTimestamp = new Date(bookedAppt.startDateTime).getTime();
        
        // Obtain timestamp of the ending date/time of the booked appointment
        let bookedApptEndTimestamp = new Date(bookedAppt.endDateTime).getTime();

        // Add the starting date/time of the booked appointment to the unavailability array
        unavailableDates.push(bookedApptStartTimestamp);

        // Calculate any timeslots that may fall within the appointment start and end time
        // Add these timestamps to the unavailability array
        let counter = bookedApptStartTimestamp + 900000;
        while (counter <= bookedApptEndTimestamp) {
            unavailableDates.push(counter);
            counter += 900000;
        }

        return unavailableDates;
    })



    // react-dateslot-picker configuration
    const props = {
        
        duration: 15,
        dailyTimePair: [{
            startTime: [9, 0],
            endTime: [16, 0]
        }],
        fullBooking: unavailableDates,
        onSelectDatetime: (timestamp) => {
            console.log(timestamp);

            // Format date using timestamp (milliseconds)
            let startDateTime = new Date(timestamp);

            // Calculate when the appointment will finish using the service duration (mins)
            let endTimestamp = timestamp + appointment.selectedService.duration * 60000;
            
            // Format time appointment ends using end timestamp (milliseconds)
            let endDateTime = new Date(endTimestamp);

            // Update values in appointment context
            setStartDateTime(startDateTime);
            setEndDateTime(endDateTime);

        }
    }



    return (
        <div id="selectDateTime">
            <h6 id="bookingHeading">Select date and time</h6>
            <DateSlotPicker {...props} />
        </div>
    )
}

export default SelectDateTime;