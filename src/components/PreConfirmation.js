import "../styling/Booking.css";


function PreConfirmation() {

    return (
            <div id="bookingMenu">
                <h6 id="bookingHeading">Your selections</h6>
                <div id="preConfirmService">
                    <p className="preConfirmHeader">Services</p>
                    <p className="preConfirmSelected">Colour and Cut</p>
                </div>
                <div id="preConfirmHairstylist">
                    <p className="preConfirmHeader">Hairstylist</p>
                    <p className="preConfirmSelected">Michelle Smith</p>
                </div>
                <div id="preConfirmDateTime">
                    <p className="preConfirmHeader">Date and time</p>
                    <p className="preConfirmSelected">November 20, 2023</p>
                    <p className="preConfirmSelected">2:00PM - 4:30PM (150 minutes)</p>
                </div>
            </div>
    )
}

export default PreConfirmation;