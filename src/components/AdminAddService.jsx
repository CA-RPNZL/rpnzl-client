import React, { useEffect, useState } from 'react';
import ServicesTab from '../components/AdminServicesTab';
import ModalForm from '../components/ModalAddForm';
import { Button } from 'react-bootstrap';

function AdminAddService() {
    const [services, setServices] = useState([]);
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
    <div id="AdminAddService">
        <Button onClick={handleOpenAddServiceModal}>Add Service</Button>
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
  )
}

export default AdminAddService;