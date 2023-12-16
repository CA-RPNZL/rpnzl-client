import "../styling/AppointmentsTab.css";

function AppointmentsTab(props) {
    return (
        <div className="appointmentTab">
                <div id="clientname">{`${props.client.firstName} ${props.client.lastName}`}</div>
                <div id="hairstylistname">{props.hairstylist.firstName}</div>
                <div id="servicename">{props.service.name}</div>
                <div id="duration">{props.duration}</div>
        </div>
    )
}

export default AppointmentsTab;