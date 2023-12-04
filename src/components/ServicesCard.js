import "../styling/ServicesCard.css";

function ServicesCard() {
    return (
        <div className="servicescard">
            <div id="servicesheader">
                <div id="servicename">Consultation</div>
                <div id="serviceprice">$280 - $530</div>
            </div>
            <div id="servicedescription">Approx time: 30 min</div>
        </div>
    )
}

export default ServicesCard;