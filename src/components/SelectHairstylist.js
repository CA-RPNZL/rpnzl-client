import { useContext, useEffect, useState } from "react";
import "../styling/Booking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectHairstylist() {
    const {selectedService, setService} = useContext(AppointmentContext);
    const [hairstylistList, setHairstylistList] = useState([]);

    // Fetch list of hairstylists
    useEffect(() => {
        const fetchHairstylists = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/users/hairstylists?service=" + selectedService._id);
                // Save data as json
                const responseData = await response.json();
                // Update state
                setHairstylistList(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchHairstylists();
    }, [selectedService]);


    // Update AppointmentContext with selected hairstylist
    const {selectedHairstylist, setHairstylist} = useContext(AppointmentContext);

    return (
            <div id="selectHairstylistDiv">
                <h6 id="bookingHeading">Select Hairstylist</h6>
                <form>
                    <div className="selectHairstylist" key="hairstylist0">
                        <input type="radio" id="hairstylist0" name="selectHairstylist" className="hairstylistInput" onChange={() => setHairstylist("")} />
                        <div>
                            <label htmlFor="hairstylist0" className="hairstylistName">No preference</label>
                        </div>
                    </div>
                    {hairstylistList.map(hairstylist => (
                        <div className="selectHairstylist" key={hairstylist._id}>
                            <input 
                                type="radio" 
                                id={hairstylist._id} 
                                name="selectHairstylist" 
                                className="hairstylistInput" 
                                onChange={() => setHairstylist(hairstylist)}
                            />
                            <div>
                                <FontAwesomeIcon icon={faUser} className="hairstylistIcon" />
                                <label htmlFor={hairstylist._id} className="hairstylistName">{hairstylist.firstName} {hairstylist.lastName}</label>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
    )
}

export default SelectHairstylist;