import React, { useEffect, useState } from 'react';
import AppointmentsTab from '../components/AdminAppointmentsTab'; 
import UsersTab from '../components/AdminUsersTab';
import ServicesTab from '../components/AdminServicesTab';
import "../styling/AdminPortal.css";

function AdminPortal() {
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('appointments');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/appointments");
                const responseData = await response.json();
                setAppointments(responseData);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchUsers = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/users");
                const responseData = await response.json();
                setUsers(responseData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchServices = async () => {
            try {
                let response = await fetch(process.env.REACT_APP_API + "/services");
                const responseData = await response.json();
                setServices(responseData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
        fetchUsers();
        fetchServices();
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <div id="tab-buttons">
                <button onClick={() => handleTabChange('appointments')}>Appointments</button>
                <button onClick={() => handleTabChange('users')}>Users</button>
                <button onClick={() => handleTabChange('services')}>Services</button>
            </div>

            {activeTab === 'appointments' && (
                <div id="appointments">
                    <h1>Appointments</h1>
                    <div id="appointmentcontainer">
                        {appointments.length > 0 &&
                            appointments.map((appointment) => (
                                <AppointmentsTab
                                    key={appointment._id}
                                    client={appointment.client}
                                    hairstylist={appointment.hairstylist}
                                    service={appointment.service}
                                    duration={appointment.duration}
                                />
                            ))}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
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
            )}

            {activeTab === 'services' && (
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
            )}
        </div>
    );
}

export default AdminPortal;