import "../styling/Services.css";
import BookNowButton from "../components/BookNowButton";
import ServicesCard from "../components/ServicesCard";
import { useEffect, useState } from "react";

function Services() {
    // Create state for services
    const [services, setServices] = useState([]);

    // Create state for error message
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Fetch data from API - no authorisation required
                let response = await fetch(process.env.REACT_APP_API + "/services")
                // Save data as json
                const responseData = await response.json();
                // Update state
                setServices(responseData);
            } catch (error) {
                console.error("An error has occurred:", error);
                setError("An error occurred while loading the list of services.");
                // console.log(process.env.REACT_APP_API + "/services")
            }
        }

        fetchServices();
    }, []);

    return (
        <div id="services">
            <h1>Services</h1>
            <div id="servicescontainer">
            {/* Populate cards if services contains a value */}
            {services.length > 0 && 
            services.map(service => (
                <ServicesCard
                    key={service._id}
                    name={service.name}
                    price={service.price}
                    duration={service.duration}
                    description={service.description}
                 />
            ))}
            {error && <p className="error-message">{error}</p>}
            </div>
            <BookNowButton/>
            <p id="disclaimer">Please note: Final price will be given on day of appointment after consultation.</p>
        </div>
    )
};

export default Services;