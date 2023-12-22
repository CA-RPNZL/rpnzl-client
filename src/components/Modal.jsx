import React from 'react'
import { Button } from 'react-bootstrap';
import "../styling/Modal.css"

// Modal component to display a custom modal dialog
const Modal = ({ open, heading, subheading, text, onClose, handleClick }) => {
    // If the 'open' prop is false, render nothing
    if (!open) {
        return null;
    }

    // If the 'open' prop is true, render the modal with specified content and buttons
    return (
        <div className="overlay">
            <div className="modalContainer">
                {/* Close icon that triggers the onClose function */}
                <i onClick={onClose} className="fas fa-times"/>
                <div className="modalContent">
                    {/* Heading of the modal */}
                    <h3>{heading}</h3>
                    {/* Subheading of the modal */}
                    <h5> {subheading}</h5>
                    {/* Text content of the modal */}
                    <p>{text}</p>
                </div>
                <div id="modalButtons">
                    {/* Button that triggers the handleClick function */}
                    <Button onClick={handleClick}>{heading}</Button>
                    {/* Button that triggers the onClose function */}
                    <Button onClick={onClose}>Back</Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
