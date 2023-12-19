import "../styling/UsersTab.css";

function UsersTab(props) {
    return (
        <div className="UsersTab">
                <div id="servicename">{`${props.firstName} ${props.lastName}`}</div>
                <div id="description">{props.mobileNumber}</div>
                <div id="price">{props.email}</div>
                <div id="isHairstylist">{props.is_hairstylist}</div>
                <div id="services">{props.services}</div>
                <button onClick={props.onUpdate} id='button'>Update</button>
                <button onClick={props.onDelete} id='button'>Delete</button>
        </div>
    )
}

export default UsersTab;