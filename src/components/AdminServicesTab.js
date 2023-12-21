import "../styling/ServicesTab.css";

// Functional component to represent an individual services tab
function ServicesTab(props) {
    return (
        <div className="servicesTab">
            {/* Displaying the name of the service */}
            <div id="servicename">{props.serviceName}</div>
            {/* Displaying the description of the service */}
            <div id="description">{props.description}</div>
            {/* Displaying the price of the service */}
            <div id="price">{props.price}</div>
            {/* Displaying the duration of the service */}
            <div id="duration">{props.duration}</div>
            {/* Button to trigger the delete function when clicked */}
            <button onClick={props.onDelete} id="button">Delete</button>
        </div>
    );
}

export default ServicesTab;
