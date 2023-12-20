import "../styling/Booking.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AppointmentContext from "../contexts/AppointmentContext";


function SelectHairstylist() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);
    const {selectedHairstylist, setHairstylist} = useContext(AppointmentContext);
    const {appId, setClient} = useContext(AppointmentContext);

    // Grab data from local storage
    const userId = localStorage.getItem("userId");
    
    // Update disableNextBtn
    const {setDisableNextBtn} = useContext(AppointmentContext);

    // Create state for list of hairstylists
    const [hairstylistList, setHairstylistList] = useState([]);

    // Fetch list of hairstylists
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
            };
        };
        fetchHairstylists();
    }, [appointment]);

    // Fetch appointment data
    useEffect(() => {
        const fetchAppointmentData = async () => {
    
            // If missing client ID (e.g. user is not logged in)
            if (appointment.client === "") {
                console.error("Error: Missing client ID.");
                setClient(userId);
            }

            if (selectedHairstylist !== "") {
                // Check if selectedHairstylist is from the list of hairstylists
                const validHairstylist = hairstylistList.some(
                    hairstylist => hairstylist._id === selectedHairstylist._id
                    );
                    console.log("selectedHairstylist " + selectedHairstylist);
                    console.log("validHairstylist " + validHairstylist);

                if (validHairstylist) {
                    // Update Next button to be active
                    setDisableNextBtn(false);
                } else {
                    // Update Next button to be disabled
                    setDisableNextBtn(true);
                }
    
            } else {
                // Update Next button to be disabled
                setDisableNextBtn(true);
            };
        };
        fetchAppointmentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appointment, selectedHairstylist]);

    // Check if selectedHairstylist already has a value
    useEffect(() => {
        if (appId) {
            updateHairstylist(selectedHairstylist);
        }
    });

    // Update selectedHairstylist
    const updateHairstylist = (selectedHairstylist) => {
        // If selected hairstylist is "any"
        if (hairstylistList.length > 0 && selectedHairstylist === "Any") {
            // Get random number from hairstylist list
            let randomNumber = Math.floor(Math.random()*hairstylistList.length);
            let randomHairstylist = hairstylistList[randomNumber];
            console.log(randomHairstylist);
            setHairstylist(randomHairstylist);
            updateInputBtn(randomHairstylist);
        } else {
            setHairstylist(selectedHairstylist);
            console.log(selectedHairstylist);
        }

        // Update Next button to be active
        setDisableNextBtn(false);
    };
    
    // Update input radio button
    function updateInputBtn(hairstylist) {
        return selectedHairstylist && selectedHairstylist._id === hairstylist._id;
    };



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
                            onChange={() => updateHairstylist("Any")} 
                            checked={selectedHairstylist && selectedHairstylist._id === "input-hairstylistAny"}
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
                                checked={updateInputBtn(hairstylist)}
                            />
                            <div>
                                <FontAwesomeIcon icon={faUser} className="hairstylistIcon" />
                                <label htmlFor={`input-${hairstylist._id}`} className="hairstylistName">{hairstylist.firstName} {hairstylist.lastName}</label>
                            </div>
                        </div>
                    ))}
                </form>
            </div>
    );
}

export default SelectHairstylist;