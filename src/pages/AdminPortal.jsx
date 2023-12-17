import React, { useEffect, useState } from 'react';
import AppointmentsTab from '../components/AdminAppointmentsTab';
import UsersTab from '../components/AdminUsersTab';
import ServicesTab from '../components/AdminServicesTab';
import Modal from '../components/Modal';
import '../styling/AdminPortal.css';

function AdminPortal() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Grab JWT from local storage
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API}/appointments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: jwt,
          },
        });
        const responseData = await response.json();
        setAppointments(responseData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsers = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: jwt,
          },
        });
        const responseData = await response.json();
        setUsers(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchServices = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API}/services`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: jwt,
          },
        });
        const responseData = await response.json();
        setServices(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppointments();
    fetchUsers();
    fetchServices();
  }, [jwt]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getDeleteModalContent = () => {
    switch (activeTab) {
      case 'appointments':
        return {
          heading: 'Delete Appointment',
          subheading: 'Are you sure you want to delete this appointment?',
          text: 'Deleting the appointment will remove it permanently.',
        };
      case 'users':
        return {
          heading: 'Delete User',
          subheading: 'Are you sure you want to delete this user?',
          text: 'Deleting the user will remove them permanently.',
        };
      case 'services':
        return {
          heading: 'Delete Service',
          subheading: 'Are you sure you want to delete this service?',
          text: 'Deleting the service will remove it permanently.',
        };
      default:
        return {
          heading: '',
          subheading: '',
          text: '',
        };
    }
  };

  const handleDeleteClick = (appointmentId) => {
    // Open the delete confirmation modal
    setSelectedAppointmentId(appointmentId);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    // Handle canceling the delete operation
    setOpenDeleteModal(false);
    setSelectedAppointmentId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      // Implement logic to confirm and delete based on the active tab
      switch (activeTab) {
        case 'appointments':
          console.log('Appointment deleted:', selectedAppointmentId);
          // Call API to delete the appointment using selectedAppointmentId
          await fetch(`${process.env.REACT_APP_API}/appointments/id/${selectedAppointmentId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authtoken: jwt,
            },
          });
          // Update the appointments list
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment._id !== selectedAppointmentId)
          );
          break;
        case 'users':
          // Implement logic to delete a user
          break;
        case 'services':
          // Implement logic to delete a service
          break;
        default:
          break;
      }

      // Close the modal
      setOpenDeleteModal(false);
      setSelectedAppointmentId(null);

      console.log('Delete successful');
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div id="adminPortal">
      <div id="tab-buttons">
        <a href="#" onClick={() => handleTabChange('appointments')}>
          Bookings
        </a>
        <a href="#" onClick={() => handleTabChange('users')}>
          Customers
        </a>
        <a href="#" onClick={() => handleTabChange('services')}>
          Services
        </a>
      </div>

      {activeTab === 'appointments' && (
        <div id="appointmentsAdmin" className="portalTabDiv">
          <div className="portalTabHeader">
            <h1>Bookings</h1>
          </div>
          <div id="appointmentcontainer" className="portalTabData">
            {appointments.length > 0 &&
              appointments.map((appointment) => (
                <AppointmentsTab
                  key={appointment._id}
                  client={appointment.client}
                  hairstylist={appointment.hairstylist}
                  service={appointment.service}
                  duration={appointment.duration}
                  onDelete={() => handleDeleteClick(appointment._id)}
                />
              ))}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div id="usersAdmin" className="portalTabDiv">
          <div className="portalTabHeader">
            <h1>Customers</h1>
          </div>
          <div id="user-container" className="portalTabData">
            {users.map((user) => (
              <UsersTab
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                mobileNumber={user.mobileNumber}
                email={user.email}
                isHairstylist={user.is_hairstylist}
                onDelete={() => handleDeleteClick(user._id)}

              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div id="servicesAdmin" className="portalTabDiv">
          <div className="portalTabHeader">
            <h1>Services</h1>
          </div>
          <div id="service-container" className="portalTabData">
            {services.map((service) => (
              <ServicesTab
                key={service._id}
                serviceName={service.name}
                description={service.description}
                price={service.price}
                duration={service.duration}
                onDelete={() => handleDeleteClick(service._id)}

              />
            ))}
          </div>
        </div>
      )}
      <Modal
        open={openDeleteModal}
        onClose={handleCancelDelete}
        handleClick={handleConfirmDelete}
        heading={getDeleteModalContent().heading}
        subheading={getDeleteModalContent().subheading}
        text={getDeleteModalContent().text}
      />
    </div>
  );
}

export default AdminPortal;