// import "../styling/AppointmentsTab.css";

function UsersTab(props) {
    return (
        <div className="UsersTab">
                <div id="clientname">{`${props.firstName} ${props.lastName}`}</div>
                <div id="mobile">{props.mobileNumber}</div>
                <div id="email">{props.email}</div>
        </div>
    )
}

export default UsersTab;