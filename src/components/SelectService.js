import { useContext, useEffect, useState } from "react";
import "../styling/Booking.css";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectService() {
    // Create state for list of services
    const [servicesList, setServicesList] = useState([]);

    // Fetch list of services
    // useEffect(fn, dependencyArray)
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/services")
                // Save data as json
                const responseData = await response.json();
                // Update state
                setServicesList(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchServices();
    }, []);

    // // Update AppointmentContext with selected service
    const {selectedService, setService} = useContext(AppointmentContext);


    return (
            <div id="selectServiceDiv">
                <h6 id="bookingHeading">Select Service</h6>
                <form>
                    {servicesList.map(service => (
                        <div className="selectService" key={service._id}>
                            <input 
                                type="radio" 
                                id={service._id} 
                                name="selectService" 
                                className="serviceInput" 
                                onChange={() => setService(service)} 
                            />
                            <label htmlFor={service._id} className="serviceName">{service.name}</label>
                            <label htmlFor={service._id} className="servicePrice">{service.price}</label>
                            <label htmlFor={service._id} className="serviceDuration">{`${service.duration} minutes`}</label>
                        </div>
                    ))}
                </form>
            </div>
    );
}

export default SelectService;