import "../styling/PortalAppointments.css"
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { formattedAppointmentDate, formattedAppointmentEndTime, formattedAppointmentStartTime } from "../functions/formatDate";
import Modal from '../components/Modal';
import AppointmentCard from './AppointmentCard';


function PortalAppointments() {
    // Grab jwt from local storage
    const jwt = localStorage.getItem("jwt");

    // Grab userId from local storage
    const userId = localStorage.getItem("userId");
    
    // Grab isHairstylist from local storage
    const isHairstylist = localStorage.getItem("isHairstylist");

    // Create state for list of appointments
    const [appointmentsList, setAppointmentsList] = useState([]);

    // Create state for modal
    const [openCancelModal, setOpenCancelModal] = useState(false);

    useEffect(() => {
        // Fetch list of existing appointments
        const fetchAppointments = async () => {
            try {
                let response;
                // If user is a customer
                if (userId !== "" && isHairstylist === "false") {
                    // Grab all existing appointments for user
                    response = await fetch(process.env.REACT_APP_API + "/appointments/user/" + userId + "?pastAppt=false", {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          authtoken: jwt
                        },
                    });
                // If user is a hairstylist
                } else if (userId !== "" && isHairstylist === "true") {
                    // Grab all existing appointments for hairstylist
                    response = await fetch(process.env.REACT_APP_API + "/appointments/hairstylist/" + userId + "?pastAppt=false", {
                        method: 'GET',
                        headers: {
                          'Content-Type': 'application/json',
                          authtoken: jwt
                        },
                    });
                }
                const responseData = await response.json();
                setAppointmentsList(responseData);
                console.log(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAppointments();

    }, [jwt, userId, isHairstylist]);

    // Format appointment date
    const bookedDate = (appointment) => formattedAppointmentDate(appointment.startDateTime);

    // Format appointment start time
    const bookedStartTime = (appointment) => formattedAppointmentStartTime(appointment.startDateTime);

    // Format appointment end time
    const bookedEndTime = (appointment) => formattedAppointmentEndTime(appointment.endDateTime);

    
    // 'Cancel Appointment' button functionality
    const handleCancelBtn = async () => {
        try {
            // Get id of current appointment shown in carousel
            const currentApptId = document.querySelector("li.selected div").id;
    
            // Get ID of selected appointment
            console.log(currentApptId)
    
            // Cancel appointment
    
            // POST request: /appointments
            await fetch(process.env.REACT_APP_API + "/appointments/id/" + currentApptId, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authtoken": jwt
                },
            }).then(response => response.json());
    
            // Close the cancel modal
            setOpenCancelModal(false);

            // Update the current appointment list
            setAppointmentsList(prevList => prevList.filter((appointment) => appointment._id !== currentApptId))

            // Reload page to reset carousel
            window.location.reload();
            

            console.log("Delete successful");
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    }



    return (
        <div id="portalApptsDiv">
            <h2 id="yourNextApptIs">Your next appointment is</h2>
            <Carousel
                axis="horizontal" 
                showThumbs={false} 
                showArrows={true}
                showStatus={false}
                showIndicators={true}
                width={300}
                emulateTouch
            >
                {/* Populate cards if appointments contains a value */}
                {appointmentsList.length > 0 && 
                appointmentsList.map(appointment => (
                    <AppointmentCard 
                        key={appointment._id}
                        id={appointment._id}
                        service={appointment.service} 
                        bookedDate={bookedDate(appointment)} 
                        bookedStartTime={bookedStartTime(appointment)} 
                        bookedEndTime={bookedEndTime(appointment)}
                        hairstylist={appointment.hairstylist}
                        client={appointment.client}
                        />
                ))}
            </Carousel>

            <div id="apptButtonDiv">
                <Button className="apptButtons">Update appointment</Button>
                <Button className="apptButtons" onClick={() => setOpenCancelModal(true)}>Cancel appointment</Button>
            </div>

            <p>Please note: Changes or cancellations must be made no less than 24 hours prior to your appointment</p>

            {/* Cancel appointment button modal */}
            <Modal 
            open={openCancelModal} 
            onClose={() => setOpenCancelModal(false)}
            heading={"Cancel appointment"}
            subheading={"Are you sure you want to cancel your appointment?"}
            text={"Please note: Changes or cancellations must be made no less than 24 hours prior to your appointment"}
            handleClick={handleCancelBtn}
            />              
        </div>
    )
}

export default PortalAppointments;