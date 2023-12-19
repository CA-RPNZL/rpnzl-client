import "../styling/Booking.css";
import "../styling/WhiteButton.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SelectService from "../components/SelectService";
import SelectHairstylist from "../components/SelectHairstylist";
import SelectDateTime from "../components/SelectDateTime";
import PreConfirmation from "../components/PreConfirmation";
import Confirmation from "../components/Confirmation";
import AppointmentContext from "../contexts/AppointmentContext";
import Loader from "../components/Loader";
import { Button } from "react-bootstrap";


function Booking() {
    // Use AppointmentContext data
    const {client, setClient} = useContext(AppointmentContext);
    const {selectedService, setService} = useContext(AppointmentContext);
    const {selectedHairstylist, setHairstylist} = useContext(AppointmentContext);
    const {selectedStartDateTime, setStartDateTime} = useContext(AppointmentContext);
    const {selectedEndDateTime, setEndDateTime} = useContext(AppointmentContext);
    const {appId, setAppId} = useContext(AppointmentContext);

    // Update disableNextBtn
    const {disableNextBtn} = useContext(AppointmentContext);

    // Create state for error message
    const [error, setError] = useState(null);

    // Set up page state
    const [page, setPage] = useState(0);

    // Grab data from local storage
    const jwt = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");

    // Import useNavigate
    const navigate = useNavigate();

    // Import useLocation
    const location = useLocation();

    // Get state property from useLocation
    const { state } = location;

    // Create state for loading
    const [loading, setLoading] = useState(false);
    

    // Set up page condition
    const showPage = () => {

        try {
            switch (page) {
                case 0:
                    return <SelectService />;
                case 1:
                    return <SelectHairstylist />;
                case 2:
                    return <SelectDateTime />;
                case 3:
                    return <PreConfirmation />;
                case 4:
                    return <Confirmation />;
                default:
                    return <SelectService />;
            }
        } catch (error) {
            console.error("An error occured:", error);
            setError("An error occurred while loading the booking form.");
        };
    };


    // Back button functionality
    const goBack = () => {
        setPage((previousPage) => previousPage - 1);
    };


    // Next button functionality
    const goNext = () => {
        setPage((previousPage) => previousPage + 1);
    };


    // Check if user is logged in
    useEffect(() => {
        if (!jwt) {
            // If user is not logged in, direct user to log in
            navigate("/login");
        } else {
            // If user is logged in, direct user to booking form
            navigate("/booking");
        }
    }, [jwt, navigate]);

    // Checking if we're updating an appointment
    useEffect(() => {
        
        // Check if updateAppointmentData exists
        if (state && state.updateAppointmentData) {
            // Show updateAppointmentData
            console.log(state.updateAppointmentData);
            setAppId(state.updateAppointmentData.appId);
            setService(state.updateAppointmentData.service);
            setHairstylist(state.updateAppointmentData.hairstylist);
            setStartDateTime(state.updateAppointmentData.startDateTime);
            setEndDateTime(state.updateAppointmentData.endDateTime);
        } else {
            console.log("No existing appointment data exists, creating a new booking.");
        }

        // If updating an appointment
        if (state && state.updateAppointmentData && !client) {
            setClient(state.updateAppointmentData.client);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, userId, client]);

    // Confirm button functionality
    const confirmAppt = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Set appointment data to be POSTed
            const appointmentData = {
                "client": client,
                "startDateTime": selectedStartDateTime,
                "endDateTime": selectedEndDateTime,
                "hairstylist": selectedHairstylist,
                "service": selectedService,
                "duration": selectedService.duration
            };
    
            // POST request: /appointments
            await fetch(process.env.REACT_APP_API + "/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authtoken: jwt
                },
                // converts appointmentData to a JSON string
                body: JSON.stringify(appointmentData)
            }).then(response => response.json());
    
            setPage((previousPage) => previousPage + 1);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };

    // Update button functionality
    const updateAppt = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (appId) {
                // Set appointment data to be PATCHed
                const appointmentData = {
                    "client": client,
                    "startDateTime": selectedStartDateTime,
                    "endDateTime": selectedEndDateTime,
                    "hairstylist": selectedHairstylist,
                    "service": selectedService,
                    "duration": selectedService.duration
                };
        
                // PATCH request: /appointments
                await fetch(process.env.REACT_APP_API + "/appointments/id/" + appId, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authtoken: jwt
                    },
                    // converts appointmentData to a JSON string
                    body: JSON.stringify(appointmentData)
                }).then(response => response.json());
        
                setPage((previousPage) => previousPage + 1);
    
            } else {
                console.log("This appointment ID doesn't exist:" + appId);
            };
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        };
    };



    return (
        <div id="booking">
            <div id="bookingModule">
                {showPage()}
                {error && <p className="error-message">{error}</p>}
                <div id="bookingBtns">
                    { page > 0 && page !== 4 && <Button className="whiteButton" label="Back" onClick={goBack}>Back</Button>}
                    { page < 3 && <Button className="whiteButton" label="Next" onClick={goNext} disabled={disableNextBtn}>Next</Button>}
                    { page === 3 && !appId && <Button className="whiteButton" label="Confirm" onClick={confirmAppt} disabled={disableNextBtn}>Confirm</Button>}
                    { page === 3 && appId && <Button className="whiteButton" label="Update" onClick={updateAppt} disabled={disableNextBtn}>Update</Button>}
                    
                </div>
            </div>
            <Loader open={loading} />
        </div>                                                                                                                
    );
}

export default Booking;