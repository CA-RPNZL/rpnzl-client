import "../styling/UsersTab.css";

// Functional component to represent an individual user tab
function UsersTab(props) {
    return (
        <div className="UsersTab">
            {/* Displaying the user's full name */}
            <div id="servicename">{`${props.firstName} ${props.lastName}`}</div>
            {/* Displaying the user's mobile number */}
            <div id="description">{props.mobileNumber}</div>
            {/* Displaying the user's email address */}
            <div id="price">{props.email}</div>
            {/* Displaying whether the user is a hairstylist or not */}
            <div id="isHairstylist">{props.is_hairstylist}</div>
            {/* Button to trigger the delete function when clicked */}
            <button onClick={props.onDelete} id='button'>Delete</button>
        </div>
    );
}

export default UsersTab;
