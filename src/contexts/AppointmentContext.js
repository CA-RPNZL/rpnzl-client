import { createContext, useContext, useState } from "react"

// Initial appointment data
export const appointmentContextData = {
        appId: null,
        setAppId: () => {},
        client: "",
        setClient: () => {},
        selectedService: null,
        setService: () => {},
        selectedHairstylist: "",
        setHairstylist: () => {},
        selectedStartDateTime: "",
        setStartDateTime: () => {},
        selectedEndDateTime: "",
        setEndDateTime: () => {},
        disableNextBtn: true,
        setDisableNextBtn: () => {}
};

// Create the context for appointment data
const AppointmentContext = createContext(appointmentContextData);

export default AppointmentContext;


// AppointmentContextProvider component
export const AppointmentProvider = ({children}) => {
        // Use AppointmentContext data
        const appointment = useContext(AppointmentContext);
        
        // Create states for appointment data
        const [appId, setAppId] = useState(appointment.appId);
        const [client, setClient] = useState(appointment.client);
        const [selectedService, setService] = useState(appointment.selectedService);
        const [selectedHairstylist, setHairstylist] = useState(appointment.selectedHairstylist);
        const [selectedStartDateTime, setStartDateTime] = useState(appointment.selectedStartDateTime);
        const [selectedEndDateTime, setEndDateTime] = useState(appointment.selectedEndDateTime);
        const [disableNextBtn, setDisableNextBtn] = useState(appointment.disableNextBtn);
        
        // Function to reset appointment context data
        const resetAppointment = () => {
                // Reset appointment context
                setService(null);
                setHairstylist("");
                setStartDateTime("");
                setEndDateTime("");
                setDisableNextBtn(true);
        };

        // Provide appointment context to the app
        return (
                <AppointmentContext.Provider value={{
                        appId,
                        setAppId,
                        client,
                        setClient,
                        selectedService,
                        setService,
                        selectedHairstylist,
                        setHairstylist,
                        selectedStartDateTime,
                        setStartDateTime,
                        selectedEndDateTime,
                        setEndDateTime,
                        disableNextBtn,
                        setDisableNextBtn,
                        resetAppointment
                }}>
                        {children}
                </AppointmentContext.Provider>
        );
};