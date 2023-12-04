import "../styling/Services.css";
import BookNowButton from "../components/BookNowButton";
import ServicesCard from "../components/ServicesCard";

function Services() {
    return (
        <div id="services">
            <h1>Services</h1>
            <div id="servicescontainer">
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
                <ServicesCard />
            </div>
            <BookNowButton/>
            <p>Please note: Final price will be given on day of appointment after consultation.</p>
        </div>
    )
};

export default Services;