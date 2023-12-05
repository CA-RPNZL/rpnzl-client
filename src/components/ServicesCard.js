import "../styling/ServicesCard.css";

function ServicesCard(props) {
    return (
        <div className="servicescard">
            <div id="servicesheader">
                <div id="servicename">{props.name}</div>
                <div id="serviceprice">{props.price}</div>
            </div>
            <div id="servicedescription">{props.description}</div>
        </div>
    )
}

export default ServicesCard;