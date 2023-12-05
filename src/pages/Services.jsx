import "../styling/Services.css";
import BookNowButton from "../components/BookNowButton";
import ServicesCard from "../components/ServicesCard";
import { useEffect, useState } from "react";

function Services() {
    const [services, setServices] = useState([]);

    // componentDidMount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/services");
                // Save data as json
                const responseData = await response.json();
                // Update state
                setServices(responseData.data);
            } catch (error) {
                console.log(error);
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
                    name={service.name}
                    price={service.price}
                    description={service.description}
                 />
            ))}
            </div>
            <BookNowButton/>
            <p>Please note: Final price will be given on day of appointment after consultation.</p>
        </div>
    )
};

export default Services;