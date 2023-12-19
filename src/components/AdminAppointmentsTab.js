import "../styling/AppointmentsTab.css";
import React from "react";

function AppointmentsTab(props) {
    return (
        <div className="appointmentTab">
                <div id="clientname">{`${props.client.firstName} ${props.client.lastName}`}</div>
                <div id="hairstylistname">{props.hairstylist.firstName}</div>
                <div id="servicename">{props.service.name}</div>
                <div id="startDate">{props.date}</div>
                <div id="startTime">{props.startTime}</div>
                <div id="duration">{props.duration}</div>
                <button onClick={props.onUpdate} id="button">Update</button>
                <button onClick={props.onDelete} id="button">Delete</button>
        </div>
    )
}

export default AppointmentsTab;