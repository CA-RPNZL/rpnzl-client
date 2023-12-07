import "../styling/Booking.css";
import successImage from '../assets/success.png';


function Confirmation() {

    return (
            <div id="confirmationDiv">
                <h6 id="bookingHeading">Booking confirmed</h6>
                <div id="bookingSuccessImage">
                    <img src={successImage} alt="Booking confirmed" />
                </div>
                <div id="confirmationDetails">
                    <div id="confirmedService">
                        <p className="confirmedHeader">Services</p>
                        <p className="confirmedSelected">Colour and Cut</p>
                    </div>
                    <div id="confirmedHairstylist">
                        <p className="confirmedHeader">Hairstylist</p>
                        <p className="confirmedSelected">Michelle Smith</p>
                    </div>
                    <div id="confirmedDateTime">
                        <p className="confirmedHeader">Date and time</p>
                        <p className="confirmedSelected">November 20, 2023</p>
                        <p className="confirmedSelected">2:00PM - 4:30PM (150 minutes)</p>
                    </div>
                </div>
            </div>
    )
}

export default Confirmation;