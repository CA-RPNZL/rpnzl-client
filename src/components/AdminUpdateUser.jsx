import "../styling/ModalFormUpdate.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminUpdateUser = ({open, close, data, servicesList, updateUsersList}) => {
    // Grab data from local storage
    const jwt = localStorage.getItem("jwt");
    
    // Create state for user
    const [userId, setUserId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [email, setEmail] = useState();
    const [isHairstylist, setIsHairstylist] = useState();
    const [services, setServices] = useState();

    useEffect(() => {
        // Update data
        if (data) {
            setUserId(data._id);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setMobileNumber(data.mobileNumber);
            setEmail(data.email);
            setIsHairstylist(data.is_hairstylist);
            setServices(data.services);
        }
    },[data]);
    
    // If modal is closed
    if (!open) {
        return null;
    };
    
    const handleHairstylistToggle = (value) => {
        if (value === "false") {
            setIsHairstylist(false);
            setServices([]);
        } else {
            setIsHairstylist(true);
        };
    };
    
    const handleServicesToggle = (isChecked, value) => {
        if (isChecked) {
            // If value is checked, add to services array
            // Update services state
            setServices((existingServices) => 
            [...existingServices, { 
                _id: value._id, 
                name: value.name, 
                duration: value.duration 
            }]);
        } else {
            // If value is unchecked, remove from services array
            // Update services state
            setServices((existingServices) =>
                existingServices.filter((service) => service.name !== value.name)
            );
        };
    };
    
    // Handle "Update" button functionality
    const handleConfirmUpdate = async () => {

        // Consolidate updated data
        const updatedData = {
            _id: userId ?? data._id,
            firstName: firstName ?? data.firstName,
            lastName: lastName ?? data.lastName,
            mobileNumber: mobileNumber ?? data.mobileNumber,
            email: email ?? data.email,
            is_hairstylist: isHairstylist ?? data.is_hairstylist,
            services: services ?? data.services,
        };
                
        // console.log(updatedData);

        // Send PATCH request to update user
        try {
                const response = await fetch(process.env.REACT_APP_API + "/users/id/" + updatedData._id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "authtoken": jwt
                    },
                    body: JSON.stringify(updatedData)
                });

                if (response.ok) {
                    console.log("User updated successfully");
                    toast.success("User: " + updatedData.firstName + " " + updatedData.lastName + " updated successfully.");
                    updateUsersList();
                } else {
                    toast.error("An error occurred. User: " + updatedData.firstName + " " + updatedData.lastName + " could not be updated.");
                    throw new Error(`HTTP error! Status: ${response.status}`);
                };

                await response.json();
                // console.log(response);
            } catch (error) {
                console.error(error);
            };

            // Close the modal
            close();
        };



    return (
        <div className="overlay">
            <div className="modalContainer">
                <i onClick={close} className="fas fa-times"/>
                <div className="modalContent">
                    <h3>Update user</h3>
                </div>
                <div id="modalFormDiv">
                    <Form id="modalForm" onSubmit={handleConfirmUpdate}>
                        <Form.Group className="modalFormRow">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control value={data._id} disabled />
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>First name:</Form.Label>
                            <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Last name:</Form.Label>
                            <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Mobile number:</Form.Label>
                            <Form.Control value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Hairstylist:</Form.Label>
                            <Form.Select onChange={(e) => handleHairstylistToggle(e.target.value)} value={String(isHairstylist)}>
                            {/* value attribute only takes strings */}
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Hide services field if user is not a hairstylist */}
                        {isHairstylist && (
                            <Form.Group className="modalFormRow" id="servicesForm">
                                <Form.Label>Services:</Form.Label>

                                <div id="userServiceList">
                                    {servicesList.map(serviceListItem =>
                                        <Form.Check 
                                            type="checkbox" 
                                            key={serviceListItem._id}
                                            label={serviceListItem.name} 
                                            checked={services && services.some(existingService => existingService.name === serviceListItem.name)}
                                            onChange={(e) => handleServicesToggle(e.target.checked, serviceListItem)}
                                        />

                                    )}
                                </div>
                            </Form.Group>
                        )}
                    </Form>
                </div>
                <div id="modalButtons">
                    <Button onClick={(e) => handleConfirmUpdate(e)}>Update</Button>
                    <Button onClick={close}>Back</Button>
                </div>
            </div>
        </div>
    )
}

export default AdminUpdateUser;