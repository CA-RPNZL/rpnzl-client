import { useState } from "react";
import "../styling/Booking.css";
import WhiteButton from "../components/WhiteButton";
import SelectService from "../components/SelectService";
import SelectHairstylist from "../components/SelectHairstylist";
import PreConfirmation from "../components/PreConfirmation";
import Confirmation from "../components/Confirmation";


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


    return (
        <div id="booking">
            <div id="bookingModule">
                {showPage()}
                <div id="bookingBtns">
                    { page > 0 && page !== 4 && <WhiteButton label="Back" action={goBack} />}
                    { page < 3 && <WhiteButton label="Next" action={goNext}/>}
                    { page === 3 && <WhiteButton label="Confirm" action={goNext} />}
                </div>
            </div>
        </div>
    )
}

export default Booking;