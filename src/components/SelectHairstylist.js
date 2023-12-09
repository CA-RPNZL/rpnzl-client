import { useContext, useEffect, useState } from "react";
import "../styling/Booking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectHairstylist() {
    const [hairstylistList, setHairstylistList] = useState([]);

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


    // // Update AppointmentContext with selected hairstylist
    const {hairstylist, setHairstylist} = useContext(AppointmentContext);

    return (
            <div id="selectHairstylistDiv">
                <h6 id="bookingHeading">Select Hairstylist</h6>
                <form>
                    <div className="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <label class="hairstylistName" htmlFor="No preference">No preference</label>
                        </div>
                    </div>
                    <div className="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <FontAwesomeIcon icon={faUser} className="hairstylistIcon" />
                            <label class="hairstylistName" htmlFor="No preference">Bianca Lopez</label>
                        </div>
                    </div>
                    <div className="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <FontAwesomeIcon icon={faUser} className="hairstylistIcon" />
                            <label class="hairstylistName" htmlFor="No preference">Angela Anaconda</label>
                        </div>
                    </div>
                    <div className="selectHairstylist" key="selectHairstylist">
                        <input type="radio" name="selectHairstylist" id="No preference" />
                        <div>
                            <FontAwesomeIcon icon={faUser} className="hairstylistIcon" />
                            <label class="hairstylistName" htmlFor="No preference">Michelle Smith</label>
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