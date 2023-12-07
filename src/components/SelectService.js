import { useEffect, useState } from "react";
import "../styling/Booking.css";


function SelectService() {
    const [services, setServices] = useState([]);

    // Fetch list of services
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/services")
                // Save data as json
                const responseData = await response.json();
                // Update state
                setServices(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchServices();
    }, []);


    return (
            <div id="bookingMenu">
                <h6 id="bookingHeading">Select Service</h6>
                <form>
                    {services.map(service => (
                        <div id="selectService" key={service._id}>
                            <input type="radio" id={service._id} name="selectService" className="service-input" />
                            <label htmlFor={service._id} className="service-name">{service.name}</label>
                            <label htmlFor={service._id} className="service-price">{service.price}</label>
                            <label htmlFor={service._id} className="service-duration">{`${service.duration} minutes`}</label>
                        </div>
                    ))}
                </form>
            </div>
    )
}

export default SelectService;