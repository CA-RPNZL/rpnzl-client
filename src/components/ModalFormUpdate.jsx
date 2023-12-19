import "../styling/ModalFormUpdate.css";
import { useEffect, useState } from "react";
const { Button } = require("react-bootstrap");

const ModalFormUpdate = ({open, onClose, handleUpdateConfirm, updateObjectData, updateObjectType}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [currentService, setCurrentService] = useState({});

    // If modal is closed
    if (!open) {
        return null;
    }

    // Handle confirming the update modal
    const handleUpdateConfirm2 = () => {
        switch (updateObjectType) {
            case "users":
                setCurrentUser({
                    userId: updateObjectData._id,
                    firstName: updateObjectData.firstName,
                    lastName: updateObjectData.lastName,
                    mobileNumber: updateObjectData.mobileNumber,
                    email: updateObjectData.email,
                    is_hairstylist: updateObjectData.is_hairstylist,
                    services: updateObjectData.services
                });
                console.log(currentUser);
                break;
            case "services":
                setCurrentService({
                    serviceId: updateObjectData._id,
                    name: updateObjectData.name,
                    price: updateObjectData.price,
                    description: updateObjectData.description,
                    duration: updateObjectData.duration
                });
                console.log(currentService);
                break;
            default:
                console.log("Something went wrong");
                break;
        };
        
    }

    const updateField = () => {}

    // const updatedData = {
    //     name: document.querySelector('input#servicename').value
    // }
    // console.log(updatedData);

    

    return (
        <div className="overlay">
            <div id="modalContainer">
                {/* Close button */}
                <i onClick={onClose} className="fas fa-times"/>
                <div className="modalContent">
                    <h3>Update {updateObjectType}</h3>
                </div>
                <div id="modalForm">
                    {/* If updating users, show user form */}
                    { updateObjectType === "users" && 
                        <form id="adminModalFormUpdate">
                            <div className="updateFormDiv">
                                <p htmlFor="userid">ID:</p>
                                <p id="userid">{updateObjectData._id}</p>
                            </div>
                            <div className="updateFormDiv">
                                <label htmlFor="userfirstname">First name:</label>
                                <input id="userfirstname" value={updateObjectData.firstName} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="userlastname">Last name:</label>
                                <input id="userlastname" value={updateObjectData.lastName} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="usermobile">Mobile number:</label>
                                <input id="usermobile" value={updateObjectData.mobileNumber} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="useremail">Email:</label>
                                <input id="useremail" value={updateObjectData.email} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="userishairstylist">Hairstylist:</label>
                                <input id="userishairstylist" value={updateObjectData.is_hairstylist} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="userhairstylistservices">Services:</label>
                                <input id="userhairstylistservices" value={updateObjectData.services} />
                            </div>
                        </form>
                    }
                    {/* If updating services, show service form */}
                    { updateObjectType === "services" && 
                        <form id="adminModalFormUpdate">
                            <div className="updateFormDiv">
                                <label htmlFor="servicename">Name:</label>
                                <input id="servicename" value={updateObjectData.name} onChange={updateField} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="serviceprice">Price:</label>
                                <input id="serviceprice" value={updateObjectData.price} onChange={updateField} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="servicedescription">Description:</label>
                                <input id="servicedescription" value={updateObjectData.description} onChange={updateField} />
                            </div>
                            <div className="updateFormDiv" >
                                <label htmlFor="serviceduration">Duration:</label>
                                <input id="serviceduration" value={updateObjectData.duration} onChange={updateField} />
                            </div>
                        </form>
                    }
                </div>
                <div id="modalButtons">
                    <Button onClick={handleUpdateConfirm2}>Update</Button>
                    <Button onClick={onClose}>Back</Button>
                </div>
            </div>
        </div>
    )
}

export default ModalFormUpdate;