import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AppointmentsTab from '../components/AdminAppointmentsTab'; 
import UsersTab from '../components/AdminUsersTab';
import "../styling/AdminPortal.css"
import ServicesTab from '../components/AdminServicesTab';


function AdminPortal() {
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState('appointments');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Fetch data from API
                let response = await fetch(process.env.REACT_APP_API + "/appointments")
                // Save data as json
                const responseData = await response.json();
                // Update state
                setAppointments(responseData);
                console.log(response)
            } catch (error) {
                console.log(error);
            }
        }

        fetchAppointments();
    }, []);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/users");
                const responseData = await response.json();
                setUsers(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsers();
    }, []);

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/services");
                const responseData = await response.json();
                setServices(responseData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchServices();
    }, []);
    

    
    return (
        <div>
            <div id="appointments">
                <h1>Appointments</h1>
                <div id="appointmentcontainer">
                    {/* Populate cards if appointmentss contains a value */}
                {appointments.length > 0 && 
                appointments.map(appointments => (
                    <AppointmentsTab
                        key={appointments._id}
                        client={appointments.client}
                        hairstylist={appointments.hairstylist}
                        service={appointments.service}
                        duration={appointments.duration}
                    />
                ))}
                </div>
            </div>
            <div id="users">
                <h1>Users</h1>
                <div id="user-container">
                    {users.map((user) => (
                        <UsersTab
                            key={user._id}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            mobileNumber={user.mobileNumber}
                            email={user.email}
                            isHairstylist={user.is_hairstylist}
                        />
                    ))}
                </div>
            </div>
            <div id="services">
                <h1>Services</h1>
                <div id="service-container">
                    {services.map((service) => (
                        <ServicesTab
                            key={service._id}
                            serviceName={service.name}
                            description={service.description}
                            price={service.price}
                            duration={service.duration}
                            />
                    ))}
                </div>
            </div>

        </div>
        
    )
}
export default AdminPortal;