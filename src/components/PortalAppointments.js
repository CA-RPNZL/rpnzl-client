import "../styling/PortalAppointments.css"
import { Carousel } from 'react-responsive-carousel';
import Modal from '../components/Modal';
import { useState } from 'react';
import AppointmentCard from './AppointmentCard';
import { Button } from 'react-bootstrap';

function PortalAppointments() {
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
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
                <AppointmentCard/>
                <AppointmentCard/>
                <AppointmentCard/>
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