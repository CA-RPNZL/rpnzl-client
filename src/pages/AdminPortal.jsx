import '../styling/AdminPortal.css';
import React, { useEffect, useState } from 'react';
import { formattedAppointmentDate, formattedAppointmentEndTime, formattedAppointmentStartTime } from '../functions/formatDate';
import AppointmentsTab from '../components/AdminAppointmentsTab';
import UsersTab from '../components/AdminUsersTab';
import ServicesTab from '../components/AdminServicesTab';
import Modal from '../components/Modal';
import { Link, useNavigate } from 'react-router-dom';

function AdminPortal() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  // Grab JWT from local storage
  const jwt = localStorage.getItem('jwt');

  // Import useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch list of appointments
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
        console.log(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch list of users
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

    // Fetch list of services
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

  // Switch between tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Modal for delete button
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

  // 'Update' button functionality
  const handleUpdateClick = async (e, appointment) => {
    e.preventDefault();
    console.log("Update appointment: " + appointment._id);
    try {
      // Prepare appointment data to be sent
      const updateAppointmentData = {
        appId: appointment._id,
        client: appointment.client,
        service: appointment.service,
        hairstylist: appointment.hairstylist,
        startDateTime: appointment.startDateTime,
        endDateTime: appointment.endDateTime
      }
      
      // Navigate to booking page with appointment data
      console.log(updateAppointmentData);
      navigate("/booking", { state: {updateAppointmentData}});

    } catch (error) {
      console.error("Error preparing to update appointment:", error);
    }
  };

  // 'Delete' button functionality
  // Opens up confirmation modal
  const handleDeleteClick = (appointmentId) => {
    // Open the delete confirmation modal
    setSelectedAppointmentId(appointmentId);
    setOpenDeleteModal(true);
  };

  // Modal 'Back' button functionality
  const handleCancelDelete = () => {
    // Handle canceling the delete operation
    setOpenDeleteModal(false);
    setSelectedAppointmentId(null);
  };

  // Modal 'Delete Appointment' functionality
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
  
  // Format appointment date
  const bookedDate = (appointment) => formattedAppointmentDate(appointment.startDateTime);
  
  // Format appointment start time
  const bookedStartTime = (appointment) => formattedAppointmentStartTime(appointment.startDateTime);

  // Format appointment end time
  const bookedEndTime = (appointment) => formattedAppointmentEndTime(appointment.endDateTime);



  return (
    <div id="adminPortal">
      <div id="tab-buttons">
        <Link onClick={() => handleTabChange('appointments')}>
          Bookings
        </Link>
        <Link href="#" onClick={() => handleTabChange('users')}>
          Customers
        </Link>
        <Link href="#" onClick={() => handleTabChange('services')}>
          Services
        </Link>
      </div>

      {activeTab === 'appointments' && (
        <div id="appointmentsAdmin" className="portalTabDiv">
          <div className="portalTabHeader">
            <h1>Bookings</h1>
          </div>
          <div id="appointmentcontainer" className="portalTabData">
            {/* Column Headings */}
            <div className="appointmentsColumnHeadings">
              <span>Client</span>
              <span>Hairstylist</span>
              <span>Service</span>
              <span>Date</span>
              <span>Time</span>
              <span>Duration</span>
              <span>Actions</span>
            </div>
            {appointments.length > 0 &&
              appointments.map((appointment) => (
                <AppointmentsTab
                  key={appointment._id}
                  client={appointment.client}
                  hairstylist={appointment.hairstylist}
                  service={appointment.service}
                  duration={appointment.duration}
                  date={bookedDate(appointment)}
                  startTime={bookedStartTime(appointment)}
                  endTime={bookedEndTime(appointment)}
                  onUpdate={(e) => handleUpdateClick(e, appointment)}
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
            {/* Column Headings */}
            <div className="userColumnHeadings">
              <span>Name</span>
              <span>Phone Number</span>
              <span>Email</span>
              <span>Actions</span>
            </div>
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
            {/* Column Headings */}
            <div className="servicesColumnHeadings">
              <span>Service</span>
              <span>Description</span>
              <span>Price</span>
              <span>Duration</span>
              <span>Actions</span>
            </div>`
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