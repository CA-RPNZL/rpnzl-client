import { createContext } from "react"

// Initial appointment data
export const appointmentContextData = {
        client: "",
        selectedService: "",
        selectedHairstylist: "",
        selectedStartDateTime: "",
        selectedEndDateTime: "",
        disableNextBtn: true
};


// Create the context for appointment data
const AppointmentContext = createContext(appointmentContextData);

export default AppointmentContext;