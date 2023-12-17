// import "../styling/ServicesTab.css";

function ServicesTab(props) {
    return (
        <div className="UsersTab">
                <div id="servicename">{props.serviceName}</div>
                <div id="description">{props.description}</div>
                <div id="price">{props.price}</div>
                <div id="duration">{props.duration}</div>
                <button onClick={props.onDelete}>Delete</button>
        </div>
    )
}

export default ServicesTab;