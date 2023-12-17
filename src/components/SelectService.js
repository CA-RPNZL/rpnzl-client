import "../styling/Booking.css";
import { useContext, useEffect, useState } from "react";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectService() {
    // Use AppointmentContext data
    // const appointment = useContext(AppointmentContext);
    const {selectedService, setService} = useContext(AppointmentContext);
    const {appId} = useContext(AppointmentContext);

    // Update disableNextBtn
    const {setDisableNextBtn} = useContext(AppointmentContext);

    // Reset stored appointment data function
    const {resetAppointment} = useContext(AppointmentContext);

    // Create state for list of services
    const [servicesList, setServicesList] = useState([]);


    // Fetch list of services
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
            };
        };
        fetchServices();
    }, []);

    // Check if selectedService already has a value
    useEffect(() => {
        if (appId) {
            // Set service as per stored data
            setService(selectedService);
            console.log(selectedService);
        
            // Update Next button to be active
            setDisableNextBtn(false);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appId]);

    // Update selectedService
    const updateService = (selectedService) => {
        // On change of service, resetAppointment details
        // Note: does not reset appId if it exists
        resetAppointment();

        // Set selected service
        setService(selectedService);
        console.log(selectedService);
        
        // Update Next button to be active
        setDisableNextBtn(false);
    };
    
    // Update input radio button
    function updateInputBtn(service) {
        return selectedService && selectedService._id === service._id;
    };



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
                                checked={updateInputBtn(service)}
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