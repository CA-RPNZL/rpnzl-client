import React, { useState, useEffect } from 'react';
import ModalForm from '../components/ModalFormAdd';
import { Button } from 'react-bootstrap';
import "../styling/components/AdminAddUser.css"

function AdminAddUser({ updateUsersList }) {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    password: '',
    is_admin: false,
    is_hairstylist: false,
    bio: '',
    selectedServices: [], // Added field for selected services
  });
  const [services, setServices] = useState([]); // Added state for services

  // Grab JWT from local storage
  const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    // Fetch list of services when the component mounts
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

    fetchServices();
  }, [jwt]);

  // Function to handle changes in the new user form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle changes in the selected services
//   const handleServiceChange = (e) => {
//     const { value } = e.target;
//     setNewUser((prevUser) => ({
//       ...prevUser,
//       selectedServices: value,
//     }));
//   };

  // Function to handle changes in the selected services
  const handleServiceChange = (e) => {
    const selectedServices = Array.from(e.target.selectedOptions, (option) => option.value);
  
    setNewUser((prevUser) => ({
      ...prevUser,
      selectedServices: selectedServices,
    }));
  };

  // Function to open the add user modal
  const handleOpenAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  // Function to close the add user modal
  const handleCloseAddUserModal = () => {
    setOpenAddUserModal(false);
  };

  // Function to handle the submission of the new user form
  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      // Perform the POST request to add a new user
      const response = await fetch(`${process.env.REACT_APP_API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authtoken: jwt,
        },
        body: JSON.stringify({
            ...newUser,
        selectedServices: newUser.selectedServices.map(serviceId => ({_id: serviceId })),
          }),
      });

      // Check if the request was successful
      if (response.ok) {
        console.log('User added successfully');
        // Trigger the function to update the users list in AdminPortal
        updateUsersList();
      } else {
        // Handle error if the request was not successful
        console.error('Error adding user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }

    // Close the modal after submission
    handleCloseAddUserModal();
  };

  return (
    <div id="AdminAddUser">
      <Button onClick={handleOpenAddUserModal}>Add User</Button>
      {/* Add User Modal */}
      <ModalForm
        open={openAddUserModal}
        onClose={handleCloseAddUserModal}
        handleClick={handleAddUser}
        heading="Add User"
        subheading="Enter the details for the new user"
        text=""
      >
        {/* Form for adding a new user */}
        <form>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleInputChange}
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleInputChange}
          />
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={newUser.mobileNumber}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
          />
          <label>Admin:</label>
          <input
            type="checkbox"
            name="is_admin"
            checked={newUser.is_admin}
            onChange={() => handleInputChange({ target: { name: 'is_admin', value: !newUser.is_admin } })}
          />
          <label>Hairstylist:</label>
          <input
            type="checkbox"
            name="is_hairstylist"
            checked={newUser.is_hairstylist}
            onChange={() => handleInputChange({ target: { name: 'is_hairstylist', value: !newUser.is_hairstylist } })}
          />
          <label>Bio:</label>
          <textarea
            name="bio"
            value={newUser.bio}
            onChange={handleInputChange}
          />
          <label>Services:</label>
          <select
                name="selectedServices"
                multiple
                value={newUser.selectedServices}
                onChange={handleServiceChange}
                >
                {services.map((service) => (
                    <option key={service._id} value={service._id}>
                    {service.name}
                    </option>
                ))}
            </select>
        </form>
      </ModalForm>
    </div>
  );
}

export default AdminAddUser;