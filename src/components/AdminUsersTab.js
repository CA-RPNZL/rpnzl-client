import "../styling/UsersTab.css";

// Functional component to represent an individual user tab
function UsersTab(props) {
    return (
        <div className="UsersTab">
            {/* Displaying the user's full name */}
            <div id="username">{`${props.firstName} ${props.lastName}`}</div>
            {/* Displaying the user's mobile number */}
            <div id="mobilenumber">{props.mobileNumber}</div>
            {/* Displaying the user's email address */}
            <div id="email">{props.email}</div>
            {/* Displaying whether the user is a hairstylist or not */}
            <div id="isHairstylist">{props.is_hairstylist}</div>
            {/* Displaying the list of services of the hairstylist */}
            <div id="services">{props.services}</div>
            {/* Button to trigger the update function when clicked */}
            <button onClick={props.onUpdate} id='button'>Update</button>
            {/* Button to trigger the delete function when clicked */}
            <button onClick={props.onDelete} id='button'>Delete</button>
        </div>
    );
}

export default UsersTab;
