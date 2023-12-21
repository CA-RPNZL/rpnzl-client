import "../styling/ServicesCard.css";


function ServicesCard(props) {
    return (
        <div className="servicescard">
            {/* Header section with service name and price */}
            <div id="servicesheader">
                {/* Displaying the service name */}
                <div id="servicename">{props.name}</div>
                {/* Displaying the service price */}
                <div id="serviceprice">{props.price}</div>
            </div>
            {/* Description section with duration and service description */}
            <div id="servicedescription">
                {/* Displaying the duration of the service */}
                <p>Approx time: {props.duration} mins</p>
                {/* Displaying the detailed description of the service */}
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default ServicesCard;
