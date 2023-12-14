import { useContext, useState } from "react";
import "../styling/Booking.css";
import WhiteButton from "../components/WhiteButton";
import SelectService from "../components/SelectService";
import SelectHairstylist from "../components/SelectHairstylist";
import SelectDateTime from "../components/SelectDateTime";
import PreConfirmation from "../components/PreConfirmation";
import Confirmation from "../components/Confirmation";
import AppointmentContext, { appointmentContextData } from "../contexts/AppointmentContext";


function Booking() {
    // Use AppointmentContext data
    const appointment = useContext(AppointmentContext);

    // Set up page state
    const [page, setPage] = useState(0);

    // Create states for appointment data
    const [client, setClient] = useState(appointmentContextData.client);
    const [service, setService] = useState(appointmentContextData.selectedService);
    const [hairstylist, setHairstylist] = useState(appointmentContextData.selectedHairstylist);
    const [startDateTime, setStartDateTime] = useState(appointmentContextData.selectedStartDateTime);
    const [endDateTime, setEndDateTime] = useState(appointmentContextData.selectedEndDateTime);

    // Create state for next button
    const [disableNextBtn, setDisableNextBtn] = useState(appointmentContextData.disableNextBtn);

    // Set up page condition
    const showPage = () => {
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
    };


    // Back button functionality
    const goBack = () => {
        setPage((previousPage) => previousPage - 1);
    }


    // Next button functionality
    const goNext = () => {
        setPage((previousPage) => previousPage + 1);
    }

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
        let response = await fetch(process.env.REACT_APP_API + "/appointments", {
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
            client: client,
            setClient: setClient,
            selectedService: service,
            setService: setService,
            selectedHairstylist: hairstylist,
            setHairstylist: setHairstylist,
            selectedStartDateTime: startDateTime,
            setStartDateTime: setStartDateTime,
            selectedEndDateTime: endDateTime,
            setEndDateTime: setEndDateTime,
            disableNextBtn: disableNextBtn,
            setDisableNextBtn: setDisableNextBtn
        }}>
            <div id="booking">
                <div id="bookingModule">
                    {showPage()}
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