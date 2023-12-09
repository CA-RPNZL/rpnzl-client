import { createContext } from "react"

// Initial appointment data
export const appointmentContextData = {
        client: "",
        selectedService: "",
        selectedHairstylist: "",
        selectedDate: "",
        selectedTime: ""
};


// Create the context for appointment data
const AppointmentContext = createContext();

export default AppointmentContext;