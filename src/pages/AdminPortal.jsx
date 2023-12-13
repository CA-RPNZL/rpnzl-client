import React, { useEffect, useState } from 'react';
import AppointmentsTab from '../components/AdminAppointmentsTab'; // Make sure to use the correct path
import "../styling/AdminPortal.css"


function AdminPortal() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/appointments")
                // Save data as json
                const responseData = await response.json();
                // Update state
                setAppointments(responseData);
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }

        fetchAppointments();
    }, []);
    return (
        <div id="appointments">
            <h1>Appoitnments</h1>
            <div id="appointmentcontainer">
                  {/* Populate cards if appointmentss contains a value */}
            {appointments.length > 0 && 
            appointments.map(appointments => (
                <AppointmentsTab
                    key={appointments._id}
                    client={appointments.client}
                    hairstylist={appointments.hairstylist}
                    service={appointments.service}
                    duration={appointments.duration}
                 />
            ))}
            </div>
        </div>
    )
}
export default AdminPortal;