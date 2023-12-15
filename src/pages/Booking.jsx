import "../styling/Booking.css";
import { useContext, useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import WhiteButton from "../components/WhiteButton";
import SelectService from "../components/SelectService";
import SelectHairstylist from "../components/SelectHairstylist";
import SelectDateTime from "../components/SelectDateTime";
import PreConfirmation from "../components/PreConfirmation";
import Confirmation from "../components/Confirmation";
import AppointmentContext from "../contexts/AppointmentContext";


function Booking() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);

    // Create state for error message
    const [error, setError] = useState(null);

    // Set up page state
    const [page, setPage] = useState(0);

    let navigate = useNavigate();

    // Create states for appointment data
    const [client, setClient] = useState(appointment.client);
    const [service, setService] = useState(appointment.selectedService);
    const [hairstylist, setHairstylist] = useState(appointment.selectedHairstylist);
    const [startDateTime, setStartDateTime] = useState(appointment.selectedStartDateTime);
    const [endDateTime, setEndDateTime] = useState(appointment.selectedEndDateTime);

    // Grab data for JWT
    const { jwt, userId } = useUserContext();

    // Create state for next button
    const [disableNextBtn, setDisableNextBtn] = useState(appointment.disableNextBtn);

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
        }
    };


    // Back button functionality
    const goBack = () => {
        setPage((previousPage) => previousPage - 1);
    }


    // Next button functionality
    const goNext = () => {
        setPage((previousPage) => previousPage + 1);
    }

    useEffect(() => {
        // Check if user is logged in
        if (!jwt) {
            // If user is not logged in, direct user to log in
            navigate("/login")
        } else {
            // If user is logged in, direct user to booking form
            navigate("/booking")
            // Update client ID
            console.log(userId);
            setClient(userId)
        }
    }, [jwt, navigate, userId])

    // Confirm button functionality
    const confirm = async () => {
        // Set appointment data to be POSTed
        const appointmentData = {
            "client": client,
            "startDateTime": startDateTime,
            "endDateTime": endDateTime,
            "hairstylist": hairstylist._id,
            "service": service._id,
            "duration": service.duration
        }

        // POST request: /appointments
        await fetch(process.env.REACT_APP_API + "/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // converts appointmentData to a JSON string
            body: JSON.stringify(appointmentData)
        }).then(response => response.json());
        
        setPage((previousPage) => previousPage + 1);
    }



    return (
        <AppointmentContext.Provider value={{
            client,
            setClient,
            selectedService: service,
            setService,
            selectedHairstylist: hairstylist,
            setHairstylist,
            selectedStartDateTime: startDateTime,
            setStartDateTime,
            selectedEndDateTime: endDateTime,
            setEndDateTime,
            disableNextBtn,
            setDisableNextBtn
        }}>
            <div id="booking">
                <div id="bookingModule">
                    {showPage()}
                    {error && <p className="error-message">{error}</p>}
                    <div id="bookingBtns">
                        { page > 0 && page !== 4 && <WhiteButton label="Back" action={goBack} />}
                        { page < 3 && <WhiteButton label="Next" action={goNext} disabled={disableNextBtn} />}
                        { page === 3 && <WhiteButton label="Confirm" action={confirm} disabled={disableNextBtn} />}
                    </div>
                </div>
            </div>
        </AppointmentContext.Provider>                                                                                                                     
    )
}

export default Booking;