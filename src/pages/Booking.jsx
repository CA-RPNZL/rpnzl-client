import { useEffect, useState } from "react";
import "../styling/Booking.css";
import WhiteButton from "../components/WhiteButton";
import BackButton from "../components/BackButton";


function Booking() {
    const [services, setServices] = useState([]);

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
        <div id="booking">
            <div id="bookingModule">
                <div id="bookingHeading">Select Service</div>
                <div id="bookingMenu">
                    <form>
                        {services.map(service => (
                            <div className="bookingForm">
                                <input type="radio" id={service._id} name={service.name} className="service-input" />
                                <label for={service.name} className="service-name">{service.name}</label>
                                <label for={service.name} className="service-price">{service.price}</label>
                                <label for={service.name} className="service-duration">{`${service.duration} minutes`}</label>
                            </div>
                        ))}
                    </form>
                </div>
                <div id="bookingBtns">
                    <BackButton label="Back" />
                    <WhiteButton label="Next" />
                </div>
            </div>
        </div>
    )
}

export default Booking;