import { useEffect, useState } from "react";
import "../styling/Booking.css";
import { Form } from "react-bootstrap";


function SelectHairstylist() {
    const [stylist, setStylist] = useState([]);

    // Fetch list of services
    // useEffect(() => {
    //     const fetchServices = async () => {
    //         try {
    //             // Fetch data from API
    //             let response = await fetch(process.env.REACT_APP_API + "/services")
    //             // Save data as json
    //             const responseData = await response.json();
    //             // Update state
    //             setServices(responseData);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     fetchServices();
    // }, []);


    return (
            <div id="selectHairstylistDiv">
                <h6 id="bookingHeading">Select Hairstylist</h6>
                <form>
                    <div id="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <label htmlFor="No preference">No preference</label>
                        </div>
                    </div>
                    <div id="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <span className="hairstylistEmoji">&#128135;</span>
                            <label htmlFor="No preference">Bianca Lopez</label>
                        </div>
                    </div>
                    <div id="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <span className="hairstylistEmoji">&#128135;</span>
                            <label htmlFor="No preference">Angela Anaconda</label>
                        </div>
                    </div>
                    <div id="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <span className="hairstylistEmoji">&#128135;</span>
                            <label htmlFor="No preference">Michelle Smith</label>
                        </div>
                    </div>
                </form>
                    {/* {services.map(service => (
                        <div className="bookingForm" key={service._id}>
                            <input type="radio" id={service._id} name="selectService" className="service-input" />
                            <label htmlFor={service._id} className="service-name">{service.name}</label>
                            <label htmlFor={service._id} className="service-price">{service.price}</label>
                            <label htmlFor={service._id} className="service-duration">{`${service.duration} minutes`}</label>
                        </div>
                    ))} */}
            </div>
    )
}

export default SelectHairstylist;