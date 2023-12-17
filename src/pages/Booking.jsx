import "../styling/Booking.css";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WhiteButton from "../components/WhiteButton";
import SelectService from "../components/SelectService";
import SelectHairstylist from "../components/SelectHairstylist";
import SelectDateTime from "../components/SelectDateTime";
import PreConfirmation from "../components/PreConfirmation";
import Confirmation from "../components/Confirmation";
import AppointmentContext from "../contexts/AppointmentContext";


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

    // Grab JWT from local storage
    const jwt = localStorage.getItem("jwt");

    // Grab userId from local storage
    const userId = localStorage.getItem("userId");

    // Import useNavigate
    const navigate = useNavigate();

    // Import useLocation
    const location = useLocation();

    // Set up page condition
    const showPage = () => {
        try {
            switch (page) {
                case 0:
                    console.log("Hi location updating!");
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

    // Set client ID
    useEffect(() => {
        // Update client ID
        setClient(userId);
    }, [setClient, userId]);

    // Checking if we're updating an appointment
    useEffect(() => {
        // Get state property from useLocation
        const { state } = location;
        
        // Check if updateAppointmentData exists
        if (state && state.updateAppointmentData) {
            // Show updateAppointmentData
            console.log("I can see appointment data!");
            console.log(state.updateAppointmentData);
            setAppId(state.updateAppointmentData.appId);
            setService(state.updateAppointmentData.service);
            setHairstylist(state.updateAppointmentData.hairstylist);
            setStartDateTime(state.updateAppointmentData.startDateTime);
            setEndDateTime(state.updateAppointmentData.endDateTime);
        } else {
            console.log("No updateAppointmentData exists, create a new booking.");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);


    // Confirm button functionality
    const confirmAppt = async () => {
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
    };

    // Update button functionality
    const updateAppt = async () => {
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
    };



    return (
        <div id="booking">
            <div id="bookingModule">
                {showPage()}
                {error && <p className="error-message">{error}</p>}
                <div id="bookingBtns">
                    { page > 0 && page !== 4 && <WhiteButton label="Back" action={goBack} />}
                    { page < 3 && <WhiteButton label="Next" action={goNext} disabled={disableNextBtn} />}
                    { page === 3 && !appId && <WhiteButton label="Confirm" action={confirmAppt} disabled={disableNextBtn} />}
                    { page === 3 && appId && <WhiteButton label="Update" action={updateAppt} disabled={disableNextBtn} />}
                </div>
            </div>
        </div>                                                                                                                
    );
}

export default Booking;