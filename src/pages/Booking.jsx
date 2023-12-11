import { useState } from "react";
import "../styling/Booking.css";
import WhiteButton from "../components/WhiteButton";
import SelectService from "../components/SelectService";
import SelectHairstylist from "../components/SelectHairstylist";
import SelectDateTime from "../components/SelectDateTime";
import PreConfirmation from "../components/PreConfirmation";
import Confirmation from "../components/Confirmation";
import AppointmentContext, { appointmentContextData } from "../contexts/AppointmentContext";


function Booking() {

    // Set up page state
    const [page, setPage] = useState(0);


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


    // Create states for appointment data
    const [client, setClient] = useState(appointmentContextData.client);
    const [service, setService] = useState(appointmentContextData.service);
    const [hairstylist, setHairstylist] = useState(appointmentContextData.hairstylist);
    const [startDateTime, setStartDateTime] = useState(appointmentContextData.selectedStartDateTime);
    const [endDateTime, setEndDateTime] = useState(appointmentContextData.selectedEndDateTime);

    // Create state for next button
    const [disableNextBtn, setDisableNextBtn] = useState(false);



    return (
        <AppointmentContext.Provider value={{
            client: client,
            setClient: setClient,
            selectedService: service,
            setService: setService,
            selectedHairstylist: hairstylist,
            setHairstylist: setHairstylist,
            startDateTime: startDateTime,
            setStartDateTime: setStartDateTime,
            endDateTime: endDateTime,
            setEndDateTime: setEndDateTime
        }}>
            <div id="booking">
                <div id="bookingModule">
                    {showPage()}
                    <div id="bookingBtns">
                        { page > 0 && page !== 4 && <WhiteButton label="Back" action={goBack} />}
                        { page < 3 && <WhiteButton label="Next" action={goNext} disabled={disableNextBtn} />}
                        { page === 3 && <WhiteButton label="Confirm" action={goNext} disabled={disableNextBtn} />}
                    </div>
                </div>
            </div>
        </AppointmentContext.Provider>                                                                                                                     
    )
}

export default Booking;