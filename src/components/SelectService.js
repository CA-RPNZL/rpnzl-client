import { useContext, useEffect, useState } from "react";
import "../styling/Booking.css";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectService() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);

    // Create state for list of services
    const [servicesList, setServicesList] = useState([]);
    
    // Update AppointmentContext with selected service
    const {selectedService, setService} = useContext(AppointmentContext);

    // Update disableNextBtn
    const {disableNextBtn, setDisableNextBtn} = useContext(AppointmentContext);

    // Fetch list of services + appointment data
    // useEffect(fn, dependencyArray)
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/services");
                // Save data as json
                const responseData = await response.json();
                // Update state
                setServicesList(responseData);
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };

        const fetchAppointmentData = async () => {
            if (selectedService !== "") {
                // Update input form element of selected service to be selected
                document.getElementById(`input-${selectedService._id}`).checked = true;

                // Update Next button to be active
                setDisableNextBtn(false);
            }
        };

        fetchServices();

        // Check servicesList has populated
        if (servicesList.length > 0) {
            fetchAppointmentData();
        };

    }, [servicesList, selectedService, setDisableNextBtn]);


    function updateService(service) {
        setService(service);
    }

    

    return (
            <div id="selectServiceDiv">
                <h6 id="bookingHeading">Select Service</h6>
                <form>
                    {servicesList.map(service => (
                        <div className="selectService" key={service._id}>
                            <input 
                                type="radio" 
                                id={`input-${service._id}`} 
                                name="selectService" 
                                className="serviceInput" 
                                onChange={() => updateService(service)} 
                            />
                            <label htmlFor={`input-${service._id}`} className="serviceName">{service.name}</label>
                            <label htmlFor={`input-${service._id}`} className="servicePrice">{service.price}</label>
                            <label htmlFor={`input-${service._id}`} className="serviceDuration">{`${service.duration} minutes`}</label>
                        </div>
                    ))}
                </form>
            </div>
    );
}

export default SelectService;