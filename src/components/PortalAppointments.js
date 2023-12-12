import { Button } from 'react-bootstrap';
import "../styling/PortalAppointments.css"

import Modal from '../components/Modal';
import { useState } from 'react';
import AppointmentCard from './AppointmentCard';

function PortalAppointments() {
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    return (
        <div id="portalApptsDiv">
            <h2 id="yourNextApptIs">Your next appointment is</h2>
                <AppointmentCard/>
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