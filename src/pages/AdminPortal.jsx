import '../styling/AdminPortal.css';
import React, { useEffect, useState } from 'react';
import { formattedAppointmentDate, formattedAppointmentEndTime, formattedAppointmentStartTime } from '../functions/formatDate';
import AppointmentsTab from '../components/AdminAppointmentsTab';
import UsersTab from '../components/AdminUsersTab';
import ServicesTab from '../components/AdminServicesTab';
import Modal from '../components/Modal';
import { Link, useNavigate } from 'react-router-dom';
import AdminAddService from '../components/AdminAddService';
import AdminAddUser from '../components/AdminAddUser';
import AdminUpdateService from '../components/AdminUpdateService';
import AdminUpdateUser from '../components/AdminUpdateUser';

function AdminPortal() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);
  const [openUpdateServiceModal, setOpenUpdateServiceModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [updateObjectData, setUpdateObjectData] = useState(null);

  // Grab JWT from local storage
  const jwt = localStorage.getItem('jwt');

  // Import useNavigate
  const navigate = useNavigate();
  
  // Grab current date
  let currentDate = new Date();

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
        let responseData = await response.json();

        // Filter appointments for future dates only
        const filterAppointments = responseData.filter(appointment => 
          new Date(appointment.startDateTime) >= currentDate
        );

        setAppointments(filterAppointments);
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
        console.log(responseData);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // Opens up update modal
  const handleUpdateClick = async (e, updateObject) => {
    e.preventDefault();
    switch (activeTab) {
      case 'appointments':
        console.log("Update appointment: " + updateObject._id);
        try {
          // Prepare appointment data to be sent
          const updateAppointmentData = {
            appId: updateObject._id,
            client: updateObject.client,
            service: updateObject.service,
            hairstylist: updateObject.hairstylist,
            startDateTime: updateObject.startDateTime,
            endDateTime: updateObject.endDateTime
          }
          
          // Navigate to booking page with appointment data
          console.log(updateAppointmentData);
          navigate("/booking", { state: {updateAppointmentData}});
    
        } catch (error) {
          console.error("Error preparing to update appointment:", error);
        }
        break;
      case 'users':
        console.log("Update user: " + updateObject._id);

        // Set user object data
        setUpdateObjectData(updateObject);

        // Open 'Admin Update User' modal
        setOpenUpdateUserModal(true);
        break;
      case 'services':
        console.log("Update service: " + updateObject._id);
        
        // Set service object data
        setUpdateObjectData(updateObject);

        // Open 'Admin Update Service' modal
        setOpenUpdateServiceModal(true);
        break;
      default:
        break;
    }
  };

  // Handle cancelling the update modal
  const handleUpdateCancel = () => {
    setOpenUpdateServiceModal(false);
    setOpenUpdateUserModal(false);
  };

  // 'Delete' button functionality
  // Opens up confirmation modal
  const handleDeleteClick = (itemId) => {
    // Open the delete confirmation modal
    setSelectedItemId(itemId);
    setOpenDeleteModal(true);
  };

  const handleCancelDelete = () => {
    // Handle canceling the delete operation
    setOpenDeleteModal(false);
    setSelectedItemId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      // Implement logic to confirm and delete based on the active tab
      switch (activeTab) {
        case 'appointments':
          console.log('Appointment deleted:', selectedItemId);
          // Call API to delete the appointment using selectedItemId
          await fetch(`${process.env.REACT_APP_API}/appointments/id/${selectedItemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authtoken: jwt,
            },
          });
          // Update the appointments list
          setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment._id !== selectedItemId)
          );
          break;
        case 'users':
          console.log('User deleted:', selectedItemId);
          // Call API to delete the user using selectedItemId
          await fetch(`${process.env.REACT_APP_API}/users/id/${selectedItemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authtoken: jwt,
            },
          });
          // Update the users list
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== selectedItemId));
          break;
        case 'services':
          console.log('Service deleted:', selectedItemId);
          // Call API to delete the service using selectedItemId
          await fetch(`${process.env.REACT_APP_API}/services/id/${selectedItemId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              authtoken: jwt,
            },
          });
          // Update the services list
          setServices((prevServices) => prevServices.filter((service) => service._id !== selectedItemId));
          break;
        default:
          break;
      }
  
      // Close the modal
      setOpenDeleteModal(false);
      setSelectedItemId(null);
  
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

    // Function to update the services list
    const updateServicesList = async () => {
      try {
        // Fetch the updated list of services
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

    // Function to update the users list
    const updateUsersList = async () => {
      try {
        // Fetch the updated list of users
        let response = await fetch(`${process.env.REACT_APP_API}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: jwt,
          },
        });
        const responseData = await response.json();
        console.log("updateUsersList");
        console.log(responseData);
        setUsers(responseData);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div id="adminPortal">
      <div id="tab-buttons">
        <Link onClick={() => handleTabChange('appointments')}>
          Bookings
        </Link>
        <Link href="#" onClick={() => handleTabChange('users')}>
          Users
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
            <h1>Users</h1>
            <AdminAddUser updateUsersList={updateUsersList} />
          </div>
          <div id="user-container" className="portalTabData">
            {/* Column Headings */}
            <div className="userColumnHeadings">
              <span>Name</span>
              <span>Phone Number</span>
              <span>Email</span>
              <span>Hairstylist</span>
              <span>Services</span>
              <span>Actions</span>
            </div>
            {users.map((user) => (
              <UsersTab
                key={user._id}
                firstName={user.firstName}
                lastName={user.lastName}
                mobileNumber={user.mobileNumber}
                email={user.email}
                is_hairstylist={user.is_hairstylist ? "true" : "false"} // Need to add in string values to populate
                services={user.services.map(service => service.name).join(", ")}
                onUpdate={(e) => handleUpdateClick(e,user)}
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
            <AdminAddService updateServicesList={updateServicesList} />
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
                onUpdate={(e) => handleUpdateClick(e,service)}
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
      <AdminUpdateService 
        open={openUpdateServiceModal} 
        close={handleUpdateCancel}
        data={updateObjectData} 
        updateServicesList={updateServicesList}
      />
      <AdminUpdateUser 
        open={openUpdateUserModal} 
        close={handleUpdateCancel}
        data={updateObjectData} 
        servicesList={services}
        updateUsersList={updateUsersList}
      />
    </div>
  );
}

export default AdminPortal;