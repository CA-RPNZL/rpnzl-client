import "../styling/ModalFormUpdate.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

const AdminUpdateUser = ({open, close, data, servicesList}) => {
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

    // Create state for managing checkbox list for services
    const [checkboxHairstylist, setCheckboxHairstylist] = useState();
    const [userServices, setUserServices] = useState();
    
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
            // Set toggle box for hairstylist
            setCheckboxHairstylist(data.is_hairstylist);
        }
    },[data])
    
    // If modal is closed
    if (!open) {
        return null;
    }
    // Handle "Update" button functionality
    const handleConfirmUpdate = async () => {

        // Consolidate updated data
        const updatedData = {
            userId: userId ?? data._id,
            firstName: firstName ?? data.firstName,
            lastName: lastName ?? data.lastName,
            mobileNumber: mobileNumber ?? data.mobileNumber,
            email: email ?? data.email,
            isHairstylist: isHairstylist ?? data.isHairstylist,
            services: services ?? data.services,
        }
        
        console.log(updatedData);
    }
    const handleHairstylistToggle = (value) => {
        // if (checkboxHairstylist === true) {
        //     setCheckboxHairstylist(true);
        //     setIsHairstylist(true);
        // } else {
        //     setCheckboxHairstylist(false);
        //     setIsHairstylist(false);
        // }
        if (value === "true") {
            setIsHairstylist(true);
        } else {
            setIsHairstylist(false);
        }
        console.log('isHairstylist: ' + isHairstylist);
    }
    const handleServicesToggle = ({checked}, value) => {
        if (checked) {
            checked = false;
        } else {
            checked = true;
        }
        console.log(checked);
        console.log(value.name)

        // const prevServices = [...services]


        // console.log(prevServices);


    }
    // const handleCheckboxChange = (serviceName, isChecked) => {
    //     // Update your state or perform any other actions based on the checkbox change
    //     console.log(`Service "${serviceName}" is checked: ${isChecked}`);
    
    //     // Update your state based on the checkbox change
    //     setData(prevData => {
    //         const updatedServices = [...prevData.services];
    
    //         // If isChecked is true, add the service; otherwise, remove it
    //         if (isChecked) {
    //             updatedServices.push({ name: serviceName });
    //         } else {
    //             const index = updatedServices.findIndex(service => service.name === serviceName);
    //             if (index !== -1) {
    //                 updatedServices.splice(index, 1);
    //             }
    //         }
    
    //         // Update the state with the new services array
    //         return { ...prevData, services: updatedServices };
    //     });
    // };


    return (
        <div className="overlay">
            <div id="modalContainer">
                <i onClick={close} className="fas fa-times"/>
                <div className="modalContent">
                    <h3>Update user</h3>
                </div>
                <div id="modalForm">
                    <Form onSubmit={handleConfirmUpdate}>
                        <Form.Group>
                            <Form.Label>ID:</Form.Label>
                            <Form.Control placeholder={data._id} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>First name:</Form.Label>
                            <Form.Control placeholder={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last name:</Form.Label>
                            <Form.Control placeholder={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile number:</Form.Label>
                            <Form.Control placeholder={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control placeholder={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hairstylist:</Form.Label>
                            <Form.Select onChange={(e) => handleHairstylistToggle(e.target.value)} selected={isHairstylist}>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </Form.Select>
                            {/* <Form.Check type="checkbox" checked={checkboxHairstylist} onChange={(e) => handleHairstylistToggle(e.target)} inline/>  */}
                        </Form.Group>
                        {/* {isHairstylist === "true" && */}
                            <Form.Group>
                                <Form.Label>Services:</Form.Label>
                                <div id="userServiceList">
                                    {servicesList.map(serviceListItem =>
                                        <Form.Check 
                                            type="checkbox" 
                                            label={serviceListItem.name} 
                                            checked={services && services.some(existingService => existingService.name === serviceListItem.name)}
                                            onChange={(e) => handleServicesToggle(e.target, serviceListItem)}
                                        />
                                    )}
                                </div>
                            </Form.Group>
                        {/* } */}
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