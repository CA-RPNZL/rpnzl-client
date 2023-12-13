import { useContext, useEffect, useState } from "react";
import "../styling/Booking.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectHairstylist() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);

    // Create state for list of hairstylist
    const [hairstylistList, setHairstylistList] = useState([]);
    
    // Update AppointmentContext with selected hairstylist
    const {selectedHairstylist, setHairstylist} = useContext(AppointmentContext);
    
    // Update disableNextBtn
    const {disableNextBtn, setDisableNextBtn} = useContext(AppointmentContext);

    // Fetch list of hairstylists + appointment data
    useEffect(() => {
        const fetchHairstylists = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/users/hairstylists?service=" + appointment.selectedService._id);
                // Save data as json
                const responseData = await response.json();
                // Update state
                setHairstylistList(responseData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchAppointmentData = async () => {
            if (selectedHairstylist !== "" &&  selectedHairstylist !== "Any") {
                // Update input form element of selected hairstylist to be selected
                document.getElementById(`input-${selectedHairstylist._id}`).checked = true;
    
                // Update Next button to be active
                setDisableNextBtn(false);
            } else if (selectedHairstylist === "Any") {
                // Update input form element of selected hairstylist to be selected
                document.getElementById("input-hairstylistAny").checked = true;

                // Get random number from hairstylist list
                let randomNumber = Math.floor(Math.random()*hairstylistList.length);
                let randomHairstylist = hairstylistList[randomNumber];
                console.log(randomHairstylist);
                setHairstylist(randomHairstylist);
    
                // Update Next button to be active
                setDisableNextBtn(false);
            } else {
                // Update Next button to be disabled
                setDisableNextBtn(true);
            }
        };

        fetchHairstylists();
        
        // Check hairstylistList has populated
        if (hairstylistList.length > 0) {
            fetchAppointmentData();
        };

    }, [appointment.selectedService, hairstylistList, selectedHairstylist, setHairstylist, setDisableNextBtn]);


    function updateHairstylist(hairstylist) {
        console.log(hairstylist);
        setHairstylist(hairstylist);
    }



    return (
            <div id="selectHairstylistDiv">
                <h6 id="bookingHeading">Select Hairstylist</h6>
                <form>
                    <div className="selectHairstylist" key="hairstylistAny">
                        <input 
                            type="radio"
                            id="input-hairstylistAny" 
                            name="selectHairstylist" 
                            className="hairstylistInput" 
                            onChange={() => setHairstylist("Any")} 
                        />
                        <div>
                            <label htmlFor="input-hairstylistAny" className="hairstylistName">No preference</label>
                        </div>
                    </div>
                    {hairstylistList.map(hairstylist => (
                        <div className="selectHairstylist" key={hairstylist._id}>
                            <input 
                                type="radio" 
                                id={`input-${hairstylist._id}`}
                                name="selectHairstylist" 
                                className="hairstylistInput" 
                                onChange={() => updateHairstylist(hairstylist)}
                            />
                            <div>
                                <FontAwesomeIcon icon={faUser} className="hairstylistIcon" />
                                <label htmlFor={`input-${hairstylist._id}`} className="hairstylistName">{hairstylist.firstName} {hairstylist.lastName}</label>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
    )
}

export default SelectHairstylist;