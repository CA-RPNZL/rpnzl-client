import "../styling/ModalFormUpdate.css";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const AdminUpdateService = ({open, close, data}) => {
    // Grab data from local storage
    const jwt = localStorage.getItem("jwt");
    
    // Create state for service
    const [serviceId] = useState();
    const [serviceName, setServiceName] = useState();
    const [servicePrice, setServicePrice] = useState();
    const [serviceDescription, setServiceDescription] = useState();
    const [serviceDuration, setServiceDuration] = useState();
  
    // If modal is closed
    if (!open) {
        return null;
    }

    // Handle "Update" button functionality
    const handleConfirmUpdate = async () => {

        // Consolidate updated data
        const updatedData = {
            serviceId: serviceId ?? data._id,
            name: serviceName ?? data.name,
            price: servicePrice ?? data.price,
            description: serviceDescription ?? data.description,
            duration: serviceDuration ?? data.duration
        }
        
        console.log(updatedData);
        
        // Send PATCH request to update service
        try {
            const response = await fetch(process.env.REACT_APP_API + "/services/id/" + updatedData.serviceId , {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                "authtoken": jwt,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await response.json();
            console.log(response);
        } 
        catch (error) {
            console.error(error);
        }

        // Close the modal
        close();

        // Refresh the page
        window.location.reload();
    };



    return (
        <div className="overlay">
            <div id="modalContainer">
                <i onClick={close} className="fas fa-times"/>
                <div className="modalContent">
                    <h3>Update service</h3>
                </div>
                <div id="modalForm">
                    <Form onSubmit={handleConfirmUpdate}>
                        <Form.Group>
                            <Form.Label>ID:</Form.Label>
                            <Form.Control placeholder={data._id} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control placeholder={data.name} onChange={(e) => setServiceName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price:</Form.Label>
                            <Form.Control placeholder={data.price} onChange={(e) => setServicePrice(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder={data.description} onChange={(e) => setServiceDescription(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration:</Form.Label>
                            <Form.Control placeholder={data.duration} onChange={(e) => setServiceDuration(e.target.value)} required/>
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