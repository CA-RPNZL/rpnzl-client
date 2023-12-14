// import "../styling/ServicesTab.css";

function ServicesTab(props) {
    return (
        <div className="UsersTab">
                <div id="servicename">{props.name}</div>
                <div id="description">{props.description}</div>
                <div id="price">{props.price}</div>
                <div id="duration">{props.duration}</div>
        </div>
    )
}

export default ServicesTab;