import React, { useEffect, useState } from 'react';
import AppointmentsTab from '../components/AdminAppointmentsTab';
import UsersTab from '../components/AdminUsersTab';
import ServicesTab from '../components/AdminServicesTab';
import Modal from '../components/Modal';
import ModalForm from '../components/ModalAddForm';
import { Button } from 'react-bootstrap';

function AdminPortal() {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('appointments');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    description: '',
    duration: 0,
  });

  // Grab JWT from local storage
  const jwt = localStorage.getItem('jwt');

  const fetchServicesData = async () => {
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

  useEffect(() => {
    // Call fetchServicesData when the component mounts
    fetchServicesData();
  }, []);

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

    fetchAppointments();
    fetchUsers();
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

  // Function to handle changes in the new service form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  // Function to open the add service modal
  const handleOpenAddServiceModal = () => {
    setOpenAddServiceModal(true);
  };

  // Function to close the add service modal
  const handleCloseAddServiceModal = () => {
    setOpenAddServiceModal(false);
  };

  // Function to handle the submission of the new service form
  const handleAddService = async (e) => {
    e.preventDefault();

    try {
      // Perform the POST request to add a new service
      const response = await fetch(`${process.env.REACT_APP_API}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: jwt,
        },
        body: JSON.stringify(newService),
      });

      // Check if the request was successful
      if (response.ok) {
        // Refresh the list of services
        fetchServicesData();
        console.log('Service added successfully');
      } else {
        // Handle error if the request was not successful
        console.error('Error adding service');
      }
    } catch (error) {
      console.error('Error adding service:', error);
    }

    // Close the modal after submission
    handleCloseAddServiceModal();
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
        <div id="appointments" className="portalTabDiv">
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
        <div id="users" className="portalTabDiv">
          <div className="portalTabHeader">
            <h1>Users</h1>
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
        <div id="services" className="portalTabDiv">
          <div className="portalTabHeader">
            <h1>Services</h1>
            <Button onClick={handleOpenAddServiceModal}>Add Service</Button>
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
      {/* Add Service Modal */}
      <ModalForm
        open={openAddServiceModal}
        onClose={handleCloseAddServiceModal}
        handleClick={handleAddService}
        heading="Add Service"
        subheading="Enter the details for the new service"
        text=""
      >
        {/* Form for adding a new service */}
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newService.price}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newService.description}
            onChange={handleInputChange}
          />
          <label>Duration:</label>
          <input
            type="number"
            name="duration"
            value={newService.duration}
            onChange={handleInputChange}
          />
        </form>
      </ModalForm>
    </div>
  );
}

export default AdminPortal;