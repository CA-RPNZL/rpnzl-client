    // Update start date with date formatting
    const formattedAppointmentDate = (date) => new Date(date).toLocaleDateString("en-AU", { dateStyle: "long"});
    
    // Update start date with time formatting
    const formattedAppointmentStartTime = (startTime) => new Date(startTime).toLocaleTimeString("en-AU", { timeStyle: "short"});
    
    // Update end date with time formatting
    const formattedAppointmentEndTime = (endTime) => new Date(endTime).toLocaleTimeString("en-AU", { timeStyle: "short"});


    module.exports = {
        formattedAppointmentDate,
        formattedAppointmentStartTime,
        formattedAppointmentEndTime
    }