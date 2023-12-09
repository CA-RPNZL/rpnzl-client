import Calendar from "react-calendar";
import "../styling/Booking.css";
import { useContext, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";

function SelectDateTime() {
    // Get today's date
    const currentDate = new Date();

    // Update AppointmentContext with selected date
    const {selectedDate, setDate} = useContext(AppointmentContext);

    // // State for selected date
    // const [selectedDate, setSelectedDate] = useState(currentDate);


    // Update AppointmentContext with selected time
    const {selectedTime, setTime} = useContext(AppointmentContext);

    // // State for selected time
    // const [selectedTime, setSelectedTime] = useState(null);

    // Calendar function: format day of the week
    const formatDay = (locale, date) => {
        return date.toLocaleDateString(locale, {weekday: "long"}).charAt(0);
    }

    // Black out dates in the past
    const tileDisabled = ({date}) => {
        return date < currentDate;
    }

    //
    const onChange = (value) => {
        console.log(value);
        setDate(value);
    }

    return (
        <div id="selectDateTime">
            <h6 id="bookingHeading">Select date and time</h6>
            <Calendar 
                defaultValue={currentDate}
                tileDisabled={tileDisabled}
                formatShortWeekday={formatDay}
                onChange={onChange}
            />
            <div id="timeSelector">
                <div id="timeHeading">
                    Time
                </div>
                <div id="morningTimeSlots">
                    <div className="timeSubheading" id="morning">
                        Morning
                    </div>
                    <button className="timeSlot">9:00am</button>
                    <button className="timeSlot">9:30am</button>
                    <button className="timeSlot">10:00am</button>
                    <button className="timeSlot">10:30am</button>
                </div>
                <div id="afternoonTimeSlots">
                    <div className="timeSubheading" id="afternoon">
                        Afternoon
                    </div>
                    <button className="timeSlot">12:30pm</button>
                    <button className="timeSlot">2:30pm</button>
                    <button className="timeSlot">3:00pm</button>
                    <button className="timeSlot">3:30pm</button>
                    <button className="timeSlot">4:00pm</button>
                    <button className="timeSlot">6:00pm</button>
                </div>
            </div>
        </div>
    )
}

export default SelectDateTime;