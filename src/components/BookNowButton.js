import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styling/BookNowButton.css';
import { useContext } from 'react';
import AppointmentContext from '../contexts/AppointmentContext';

function BookNowButton() {
    // Import useNavigate
    let navigate = useNavigate();
    
    // Reset stored appointment data function
    const {resetAppointment, setAppId} = useContext(AppointmentContext);

    const handleClick = () => {
        // Reset current stored data
        resetAppointment();

        // Reset appId
        setAppId(null);


        // Go to booking page
        navigate("/booking");
    };

    return (
        <div id="bookNowBtnContainer">
            <Button onClick={handleClick} className="bookNowButton">Book now</Button>
        </div>
    )
}

export default BookNowButton;