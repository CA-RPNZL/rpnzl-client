import "../styling/AppointmentsTab.css";

function AppointmentsTab(props) {
    return (
        <div className="appointmentTab">
            <div id="appointmentHeader">
                <div id="clientname">{props.client}</div>
                <div id="hairstylistname">{props.hairstylist}</div>
                <div id="servicename">{props.service}</div>
                <div id="duration">{props.duration}</div>
            </div>
        </div>
    )
}

export default AppointmentsTab;