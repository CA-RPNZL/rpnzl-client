import "../styling/PortalAppointments.css"
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useUserContext } from "../contexts/UserContext";
import Modal from '../components/Modal';
import AppointmentCard from './AppointmentCard';

function PortalAppointments() {
    // Grab data from UserContext
    const { userId, isHairstylist } = useUserContext();

    // Create state for list of appointments
    const [appointmentsList, setAppointmentsList] = useState([]);

    // Create state for modal
    const [openCancelModal, setOpenCancelModal] = useState(false);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let response;
                // If user is a customer
                if (userId !== "" && (!isHairstylist)) {
                    // Grab all existing appointments for user
                    response = await fetch(process.env.REACT_APP_API + "/appointments/user/" + userId + "?pastAppt=false");
                // If user is a hairstylist
                } else if (userId !== "" && isHairstylist) {
                    // Grab all existing appointments for hairstylist
                    response = await fetch(process.env.REACT_APP_API + "/appointments/hairstylist/" + userId + "?pastAppt=false");
                }
                const responseData = await response.json();
                setAppointmentsList(responseData);
                console.log(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAppointments();

    }, [userId, isHairstylist]);

    // Update start date with date formatting
    const formattedAppointmentDate = (date) => new Date(date).toLocaleDateString("en-AU", { dateStyle: "long"});
    
    // Update start date with time formatting
    const formattedAppointmentStartTime = (startTime) => new Date(startTime).toLocaleTimeString("en-AU", { timeStyle: "short"});
    
    // Update end date with time formatting
    const formattedAppointmentEndTime = (endTime) => new Date(endTime).toLocaleTimeString("en-AU", { timeStyle: "short"});



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
                emulateTouch>
                {/* Populate cards if appointments contains a value */}
                {appointmentsList.length > 0 && 
                appointmentsList.map(appointment => (
                    <AppointmentCard 
                        key={appointment._id}
                        service={appointment.service} 
                        bookedDate={formattedAppointmentDate(appointment.startDateTime)} 
                        bookedStartTime={formattedAppointmentStartTime(appointment.startDateTime)} 
                        bookedEndTime={formattedAppointmentEndTime(appointment.endDateTime)}
                        hairstylist={appointment.hairstylist}
                        client={appointment.client}
                        />
                ))}
            </Carousel>
            <div id="apptButtonDiv">
                <Button className="apptButtons">Update Appointment</Button>
                <Button className="apptButtons" onClick={() => setOpenCancelModal(true)}>Cancel Appointment</Button>
            </div>
            <p>Please note: Changes or cancellations must be made no less 
than 24 hours prior to your appointment</p>
        <Modal 
            open={openCancelModal} 
            onClose={() => setOpenCancelModal(false)}
            heading={"Cancel Appointment"}
            subheading={"Are you sure you want to cancel your appointment?"}
            text={"Please note: Changes or cancellations must be made no less than 24 hours prior to your appointment"}
        />              
        </div>
    )
}

export default PortalAppointments;