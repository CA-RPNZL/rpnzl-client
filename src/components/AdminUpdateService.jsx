import "../styling/ModalFormUpdate.css";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminUpdateService = ({open, close, data, updateServicesList}) => {
    // Grab data from local storage
    const jwt = localStorage.getItem("jwt");
    
    // Create state for service
    const [serviceId, setServiceId] = useState();
    const [serviceName, setServiceName] = useState();
    const [servicePrice, setServicePrice] = useState();
    const [serviceDescription, setServiceDescription] = useState();
    const [serviceDuration, setServiceDuration] = useState();
      
    useEffect(() => {
        // Update data
        if (data) {
            setServiceId(data._id);
            setServiceName(data.name);
            setServicePrice(data.price);
            setServiceDescription(data.description);
            setServiceDuration(data.duration);
        }
    },[data]);

    // If modal is closed
    if (!open) {
        return null;
    }

    // Handle "Update" button functionality
    const handleConfirmUpdate = async () => {

        // Consolidate updated data
        const updatedData = {
            _id: serviceId ?? data._id,
            name: serviceName ?? data.name,
            price: servicePrice ?? data.price,
            description: serviceDescription ?? data.description,
            duration: serviceDuration ?? data.duration
        }
        
        console.log(updatedData);
        
        // Send PATCH request to update service
        try {
            const response = await fetch(process.env.REACT_APP_API + "/services/id/" + updatedData._id, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                "authtoken": jwt
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                console.log("Service updated successfully");
                toast.success("Service: " + updatedData.name + " updated successfully.");
                updateServicesList();
            } else {
                toast.error("An error occurred.Service: " + updatedData.name + " could not be updated.");
                throw new Error(`HTTP error! Status: ${response.status}`);
            };

            await response.json();
            console.log(response);
        } 
        catch (error) {
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
                    <h3>Update service</h3>
                </div>
                <div id="modalFormDiv">
                    <Form id="modalForm" onSubmit={handleConfirmUpdate}>
                        <Form.Group className="modalFormRow">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control value={serviceId} disabled />
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control value={serviceName} onChange={(e) => setServiceName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Price:</Form.Label>
                            <Form.Control value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={5} value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="modalFormRow row3">
                            <Form.Label>Duration:</Form.Label>
                            <Form.Control value={serviceDuration} onChange={(e) => setServiceDuration(e.target.value)} required/>
                            <InputGroup.Text> mins</InputGroup.Text>
                        </Form.Group>
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

export default AdminUpdateService;