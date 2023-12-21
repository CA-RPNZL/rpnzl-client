import "../styling/AppointmentsTab.css";
import React from "react";

// Functional component to represent an individual appointment tab
function AppointmentsTab(props) {
    return (
        <div className="appointmentTab">
            {/* Displaying the client's full name */}
            <div id="clientname">{`${props.client.firstName} ${props.client.lastName}`}</div>
            {/* Displaying the hairstylist's first name */}
            <div id="hairstylistname">{props.hairstylist.firstName}</div>
            {/* Displaying the name of the service */}
            <div id="servicename">{props.service.name}</div>
            {/* Displaying the appointment date */}
            <div id="startDate">{props.date}</div>
            {/* Displaying the appointment start time */}
            <div id="startTime">{props.startTime}</div>
            {/* Displaying the duration of the appointment */}
            <div id="duration">{props.duration}</div>
            {/* Button to trigger the update function when clicked */}
            <button onClick={props.onUpdate} id="button">Update</button>
            {/* Button to trigger the delete function when clicked */}
            <button onClick={props.onDelete} id="button">Delete</button>
        </div>
    );
}

export default AppointmentsTab;
